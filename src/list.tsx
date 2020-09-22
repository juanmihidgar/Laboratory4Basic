import React, { useState } from "react";
import { Link, generatePath } from "react-router-dom";
import { Paginator } from "./paginator";
import { useCompanyMemberList } from "./useCompanyMemberList";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import Avatar from "@material-ui/core/Avatar";
import * as classes from "./list.styles";

export const ListPage: React.FC = () => {
  const [company, setCompany] = useState("");
  const {
    members,
    setSearchedCompany,
    totalPages,
    currentPage,
    setCurrentPage,
  } = useCompanyMemberList("lemoncode", 3);

  const onPageChanged = (indexPage: number) => {
    setCurrentPage(indexPage);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    setSearchedCompany(company);
  };

  return (
    <>
      <div className={classes.listContainer}>
        <form onSubmit={handleSubmit}>
          <label>
            Insert your Company here:
            <input
              // name="company"
              type="text"
              placeholder="lemoncode"
              onChange={(e) => {
                setCompany(e.target.value);
              }}
            ></input>
          </label>
          <input type="submit" value="Submit" />
        </form>

        <div className={classes.tableContainer}>
          <TableContainer component={Paper}>
            <Table aria-label="simple table">
              <TableHead>
                <TableRow className={classes.headerRow}>
                  <TableCell align="center">Avatar</TableCell>
                  <TableCell align="center">Id</TableCell>
                  <TableCell align="center">Name</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {members.map((member) => (
                  <TableRow key={member.id}>
                    <TableCell align="center">
                      <Avatar src={member.avatar_url}></Avatar>
                    </TableCell>
                    <TableCell align="center">{member.id}</TableCell>
                    <TableCell align="center">
                      <Link
                        to={generatePath("/detail/:id", { id: member.login })}
                      >
                        {member.login}
                      </Link>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </div>

        <Paginator
          totalPages={totalPages}
          currentPage={currentPage}
          onPageChanged={onPageChanged}
        />
      </div>
    </>
  );
};
