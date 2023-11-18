import Avatar from "../../shared/components/UIElements/Avatar";
import "./UserItem.css";
import { Link } from "react-router-dom";
import Card from "../../shared/components/UIElements/Card";
const UserItem = (props) => {
  const API_URL = process.env.REACT_APP_API_KEY;
  return (
    <li className="user-item">
        <Card  className="user-item__content">
          <Link to={`/${props.id}/places`}>
            <div className="user-item__image">
              <Avatar image={`${API_URL}/${props.image}`} alt={props.name}></Avatar>
            </div>
            <div className="user-item__info">
              <h2>{props.name}</h2>
              <h3>
                {props.placeCount} {props.placeCount === 1 ? "Place" : "Places"}{" "}
              </h3>
            </div>
          </Link>
        </Card>
    </li>
  );
};

export default UserItem;
