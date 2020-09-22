import React, { useState } from "react";
import { Link, generatePath } from "react-router-dom";
import { Paginator } from "./paginator";
import { useCompanyMemberList } from "./useCompanyMemberList";

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

    /* Forma alternativa de obtener la información del formulario */
    // console.log(new FormData(e.target).get("company"));
    setSearchedCompany(company);
  };

  return (
    <>
      <h2>Hello from List page</h2>
      <table className="table">
        <thead>
          <tr>
            <th>Avatar</th>
            <th>Id</th>
            <th>Name</th>
          </tr>
        </thead>
        <tbody>
          {members.map((member) => (
            <tr key={member.id}>
              <td>
                <img src={member.avatar_url} style={{ width: "5rem" }} />
              </td>
              <td>
                <span>{member.id}</span>
              </td>
              <td>
                <Link to={generatePath("/detail/:id", { id: member.login })}>
                  {member.login}
                </Link>{" "}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <Paginator
        totalPages={totalPages}
        currentPage={currentPage}
        onPageChanged={onPageChanged}
      />

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
    </>
  );
};
