import React from "react";
import PropTypes from "prop-types";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import TreeView from "@mui/lab/TreeView";
import TreeItem, { treeItemClasses } from "@mui/lab/TreeItem";
import Typography from "@mui/material/Typography";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import ArrowRightIcon from "@mui/icons-material/ArrowRight";
import Card from "@mui/material/Card";
import PersonAddAltOutlinedIcon from "@mui/icons-material/PersonAddAltOutlined";
import PersonRemoveOutlinedIcon from "@mui/icons-material/PersonRemoveOutlined";
import ManageAccountsOutlinedIcon from "@mui/icons-material/ManageAccountsOutlined";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
import IconButton from "@mui/material/IconButton";
import { users } from "./../api/user";

const StyledTreeItemRoot = styled(TreeItem)(({ theme }) => ({
  color: theme.palette.text.secondary,
  [`& .${treeItemClasses.content}`]: {
    color: theme.palette.text.secondary,
    // borderTopRightRadius: theme.spacing(2),
    // borderBottomRightRadius: theme.spacing(2),
    paddingRight: theme.spacing(1),
    fontWeight: theme.typography.fontWeightMedium,
    "&.Mui-expanded": {
      fontWeight: theme.typography.fontWeightMedium,
    },
    "&:hover": {
      backgroundColor: theme.palette.action.hover,
    },
    "&.Mui-focused, &.Mui-selected, &.Mui-selected.Mui-focused": {
      backgroundColor: `var(--tree-view-bg-color, ${theme.palette.action.selected})`,
      color: "var(--tree-view-color)",
    },
    [`& .${treeItemClasses.label}`]: {
      fontWeight: "inherit",
      color: "inherit",
    },
  },
}));

const StyledTreeItem = (props) => {
  const {
    bgColor,
    color,
    labelIcon: PersonOutlineOutlinedIcon,
    labelInfo,
    labelText,
    ...other
  } = props;

  return (
    <StyledTreeItemRoot
      label={
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            py: 1.5,
          }}
        >
          <Box sx={{ display: "flex" }}>
            <Box
              component={PersonOutlineOutlinedIcon}
              color="inherit"
              sx={{ mr: 1 }}
            />
            <Typography
              variant="body2"
              sx={{ fontWeight: "inherit", flexGrow: 1, fontSize: "20px" }}
            >
              {labelText}
            </Typography>
          </Box>
          <Typography variant="caption" color="inherit" sx={{ zIndex: 100 }}>
            <IconButton color="success">
              <PersonAddAltOutlinedIcon onClick={props.setAddDialog} />
            </IconButton>
            <IconButton color="error">
              <PersonRemoveOutlinedIcon />
            </IconButton>
            <IconButton color="primary">
              <ManageAccountsOutlinedIcon />
            </IconButton>
            {labelInfo}
          </Typography>
        </Box>
      }
      style={{
        "--tree-view-color": color,
        "--tree-view-bg-color": bgColor,
      }}
      {...other}
    />
  );
};

StyledTreeItem.propTypes = {
  bgColor: PropTypes.string,
  color: PropTypes.string,
  labelIcon: PropTypes.elementType.isRequired,
  labelInfo: PropTypes.string,
  labelText: PropTypes.string.isRequired,
};

function flatten(array, depth) {
  return array.reduce((p, c) => {
    if (c.users_tree.length !== 0) {
      c.depth = depth;
      const flatChildren = flatten(c.users_tree, depth + 1);
      c.users_tree.concat(flatChildren);
      return p.concat([c]);
    } else {
      c.depth = depth;
      return p.concat([c]);
    }
  }, []);
}

const flatData = flatten(users.results, 1);

const UsersTree = (props) => {
  console.log("UsersTree");
  return (
    <Card sx={{ p: 2, overflowX: "auto" }} className="Users">
      <TreeView
        aria-label="gmail"
        onNodeSelect={props.handleFocusNode}
        defaultCollapseIcon={<ArrowDropDownIcon className="tree-icon" />}
        defaultExpandIcon={<ArrowRightIcon className="tree-icon" />}
        defaultEndIcon={<div style={{ width: 24, fontSize: "25px" }} />}
        sx={{ flexGrow: 1, minWidth: 700, overflowY: "auto" }}
      >
        <Tree data={flatData} setAddDialog={() => props.setAddDialog(true)} />
      </TreeView>
    </Card>
  );
};

export default React.memo(UsersTree);

const Tree = (props) => {
  const data = props.data;
  if (!data) return null;
  return (
    <>
      {data.map((user) => {
        return (
          <StyledTreeItem
            key={user.id}
            nodeId={"" + user.id}
            labelText={user.username.toUpperCase()}
            labelIcon={PersonOutlineOutlinedIcon}
            setAddDialog={props.setAddDialog}
            sx={{
              [`& .${treeItemClasses.group}`]: {
                marginLeft: 0,
                [`& .${treeItemClasses.content}`]: {
                  paddingLeft: user.depth * 2.5 + 4,
                },
              },
            }}
          >
            {user.users_tree.length !== 0 && (
              <Tree {...props} data={user.users_tree} />
            )}
          </StyledTreeItem>
        );
      })}
    </>
  );
};
