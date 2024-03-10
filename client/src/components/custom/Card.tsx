const Card = ({ message, fullName, createdAt, admin, member, id }) => {
  return (
    <div key={id}>
      <div>{message}</div>
      {member === true || admin === true ? (
        <div>
          <span>By {fullName}</span>
          <span>on {createdAt}</span>
        </div>
      ) : (
        <div>Join the club to view this</div>
      )}
    </div>
  );
};

export default Card;
