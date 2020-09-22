import Button from "@material-ui/core/Button/Button";
import React from "react";
import * as classes from "./paginator.styles";

interface Props {
  currentPage: number;
  totalPages: number;
  onPageChanged: (index: number) => void;
}

export const Paginator: React.FC<Props> = ({
  totalPages,
  currentPage,
  onPageChanged,
}) => {
  const curriedPageChanged = (index: number) => () => {
    return onPageChanged(index);
  };

  return (
    <>
      <div className={classes.container}>
        {Array(totalPages)
          .fill(0)
          .map((value, index) => {
            return (
              <Button
                className={classes.button}
                key={index}
                variant="contained"
                color={currentPage === index ? "primary" : "default"}
                onClick={curriedPageChanged(index)}
              >
                {index + 1}
              </Button>
            );
          })}
      </div>
    </>
  );
};
