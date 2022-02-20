import * as React from "react";
import PropTypes from "prop-types";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import TreeView from "@mui/lab/TreeView";
import TreeItem, { treeItemClasses } from "@mui/lab/TreeItem";
import Typography from "@mui/material/Typography";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import ArrowRightIcon from "@mui/icons-material/ArrowRight";
import Container from "@mui/material/Container";
import Card from "@mui/material/Card";
import GroupOutlinedIcon from "@mui/icons-material/GroupOutlined";
// import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
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
      fontWeight: theme.typography.fontWeightRegular,
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
  [`& .${treeItemClasses.group}`]: {
    marginLeft: 0,
    [`& .${treeItemClasses.content}`]: {
      paddingLeft: theme.spacing(2),
    },
  },
}));

function StyledTreeItem(props) {
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
        <Box className sx={{ display: "flex", alignItems: "center", py: 1.5 }}>
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
          <Typography variant="caption" color="inherit">
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
}

StyledTreeItem.propTypes = {
  bgColor: PropTypes.string,
  color: PropTypes.string,
  labelIcon: PropTypes.elementType.isRequired,
  labelInfo: PropTypes.string,
  labelText: PropTypes.string.isRequired,
};

const Users = () => {
  const handleFocusNode = (e, v) => {
    console.log(v);
  };
  return (
    <Container maxWidth="xl" sx={{ mt: 2 }}>
      <Card sx={{ py: 2 }}>
        <TreeView
          aria-label="gmail"
          onNodeSelect={handleFocusNode}
          defaultCollapseIcon={<ArrowDropDownIcon className="tree-icon" />}
          defaultExpandIcon={<ArrowRightIcon className="tree-icon" />}
          defaultEndIcon={<div style={{ width: 24, fontSize: "25px" }} />}
          sx={{ flexGrow: 1, maxWidth: 600, overflowY: "auto" }}
        >
          {users.results.map((user) => {
            return (
              <StyledTreeItem
                nodeId={user.id}
                labelText={user.username.toUpperCase()}
                labelIcon={GroupOutlinedIcon}
              >
                {user.users_tree.length !== 0 &&
                  user.users_tree.map((user) => {
                    return (
                      <StyledTreeItem
                        nodeId={user.id}
                        labelText={user.username.toUpperCase()}
                        labelIcon={GroupOutlinedIcon}
                      >
                        {user.users_tree.length !== 0 &&
                          user.users_tree.map((user) => {
                            return (
                              <StyledTreeItem
                                nodeId={user.id}
                                labelText={user.username.toUpperCase()}
                                labelIcon={GroupOutlinedIcon}
                              >
                                {user.users_tree.length !== 0 &&
                                  user.users_tree.map((user) => {
                                    return (
                                      <StyledTreeItem
                                        nodeId={user.id}
                                        labelText={user.username.toUpperCase()}
                                        labelIcon={GroupOutlinedIcon}
                                      ></StyledTreeItem>
                                    );
                                  })}
                              </StyledTreeItem>
                            );
                          })}
                      </StyledTreeItem>
                    );
                  })}
              </StyledTreeItem>
            );
          })}
        </TreeView>
      </Card>
    </Container>
  );
};

export default Users;
