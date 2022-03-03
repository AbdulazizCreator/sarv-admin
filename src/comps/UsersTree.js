import React, { useEffect, useState } from "react";
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
import CircularProgress from "@mui/material/CircularProgress";
import { getData } from "../api/common";

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
    openDialog,
    doWantDelete,
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
            <IconButton onClick={openDialog} color="success">
              <PersonAddAltOutlinedIcon />
            </IconButton>
            <IconButton color="primary">
              <ManageAccountsOutlinedIcon />
            </IconButton>
            <IconButton color="error" onClick={doWantDelete}>
              <PersonRemoveOutlinedIcon />
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
    if (c.children.length !== 0) {
      c.depth = depth;
      const flatChildren = flatten(c.children, depth + 1);
      c.children.concat(flatChildren);
      return p.concat([c]);
    } else {
      c.depth = depth;
      return p.concat([c]);
    }
  }, []);
}

const UsersTree = ({ handleFocusNode, openDialog, doWantDelete, callback }) => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    setLoading(true);
    getData("api/accounts/")
      .then((res) => {
        const usersArrWithDepth = flatten(res.data, 1);
        setUsers(usersArrWithDepth);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [callback]);
  if (loading)
    return (
      <Box sx={{ display: "flex", justifyContent: "center" }}>
        <CircularProgress size={100} />
      </Box>
    );

  return (
    <Card sx={{ p: 2, overflowX: "auto" }} className="Users">
      <TreeView
        aria-label="gmail"
        onNodeSelect={handleFocusNode}
        defaultCollapseIcon={<ArrowDropDownIcon className="tree-icon" />}
        defaultExpandIcon={<ArrowRightIcon className="tree-icon" />}
        defaultEndIcon={<div style={{ width: 24, fontSize: "25px" }} />}
        sx={{ flexGrow: 1, minWidth: 700, overflowY: "auto" }}
      >
        <Tree
          data={users}
          openDialog={openDialog}
          doWantDelete={doWantDelete}
        />
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
            openDialog={props.openDialog}
            doWantDelete={(e) =>
              props.doWantDelete(e, `api/accounts/${user.id}/`)
            }
            sx={{
              [`& .${treeItemClasses.group}`]: {
                marginLeft: 0,
                [`& .${treeItemClasses.content}`]: {
                  paddingLeft: user.depth * 2.5 + 4,
                },
              },
            }}
          >
            {user.children.length !== 0 && (
              <Tree {...props} data={user.children} />
            )}
          </StyledTreeItem>
        );
      })}
    </>
  );
};
