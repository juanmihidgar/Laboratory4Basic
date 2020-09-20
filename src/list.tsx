import React from "react";
import { Link, generatePath } from "react-router-dom";

interface MemberEntity {
  id: string;
  login: string;
  avatar_url: string;
}

export const ListPage: React.FC = () => {
  const [members, setMembers] = React.useState<MemberEntity[]>([]);
  const [company, setCompany] = React.useState("");
  const [companyUpdated, setCompanyUpdated] = React.useState<string>(
    "lemoncode"
  );

  React.useEffect(() => {
    fetch(`https://api.github.com/orgs/${companyUpdated}/members`)
      .then((response) => response.json())
      .then((json) => setMembers(json))
      .catch((e) => console.log(`La empresa ${companyUpdated} no existe`));
  }, [companyUpdated]);

  const companyHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setCompanyUpdated(company);
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

      <form onSubmit={companyHandler}>
        <label>
          Insert your Company here:
          <h5>Empresa</h5>
          <input
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
