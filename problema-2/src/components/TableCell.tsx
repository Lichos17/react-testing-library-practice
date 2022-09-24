import { Fragment } from "react";
import { User } from "../App";

export const TableCell = ({ user }: { user: User }) => {
  return (
    <Fragment>
      <p data-testid="user-id" className="table__cell">
        {user.user}
      </p>
      <p className="table__cell">{user.age}</p>
      <p className="table__cell">{user.city}</p>
      <p className="table__cell">{user.email}</p>
      <p className="table__cell">{user.state}</p>
    </Fragment>
  );
};
