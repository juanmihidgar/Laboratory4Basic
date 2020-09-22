import { useState, useEffect } from "react";

interface MemberEntity {
  id: string;
  login: string;
  avatar_url: string;
}

export const useCompanyMemberList = (
  defaultCompany: string,
  pageSize: number
) => {
  const [members, setMembers] = useState<MemberEntity[]>([]);
  const [searchedCompany, setSearchedCompany] = useState<string>(
    defaultCompany
  );
  const [currentPage, setCurrentPage] = useState(0);

  useEffect(() => {
    fetch(`https://api.github.com/orgs/${searchedCompany}/members`)
      .then((response) => response.json())
      .then((json) => setMembers(json))
      .catch((e) => console.log(`La empresa ${searchedCompany} no existe`));
  }, [searchedCompany]);

  return {
    members: members.slice(
      currentPage * pageSize,
      currentPage * pageSize + pageSize
    ),
    setSearchedCompany,
    totalPages: Math.ceil(members.length / pageSize),
    currentPage,
    setCurrentPage,
  };
};
