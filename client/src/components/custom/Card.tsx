import { Badge } from "@/components/ui/badge";

const Card = ({ message, fullName, id, createdAt, admin, user }) => {
  return (
    <div
      key={id}
      className="flex flex-col gap-1 border-2 border-slate-950 rounded-md py-1 pl-2"
    >
      <div>{message}</div>
      {user.member === true || user.admin === true ? (
        <div className="flex gap-2">
          <div>
            By <span className="font-bold pr-1">{fullName}</span>
            {admin && <Badge>Admin</Badge>}
          </div>
          <div>
            on <span>{createdAt}</span>
          </div>
        </div>
      ) : (
        <>
          <hr />
          <div>Join the club to view this</div>
        </>
      )}
    </div>
  );
};

export default Card;
