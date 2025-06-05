import React, {useEffect, useState} from "react";
import {Divider, List, ListItem, ListItemText, Typography} from "@mui/material";
import {Link} from "react-router-dom";
import "./styles.css";
import models from "../../modelData/models";
function UserList () {
    const users = models.userListModel();
    return (
      <div>
          <Typography variant="body1">User List</Typography>
          <List>
              {users.map((user)=>{
                  return (
                      <>
                          <ListItem key={user._id}>
                              <Link to={`/users/${user._id}`}>
                                  <ListItemText primary={`${user.first_name} ${user.last_name}`}/>
                              </Link>
                          </ListItem>
                          <Divider />
                      </>
                  )
            })}
          </List>
      </div>
    );
}

export default UserList;
