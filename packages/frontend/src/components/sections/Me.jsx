import { UserCircle2 } from "lucide-react";
import useUser from "../../hooks/useUser";
import "./me.css"
import { Link } from "react-router-dom";

function Me() {
  const { user } = useUser();

  return (
    <section className="me">
      <div className="me__container">
        <h2 className="me__title">Mi información</h2>

        <div className="me__personal-info">
          <div className="me__icon">
            <UserCircle2 size={80} />
          </div>

          <div className="me__data">
            <h3 className="me__name">
              {user.name} {user.lastName}
            </h3>
            <p className="me__item">{user.phone}</p>
            <p className="me__item">{user.email}</p>
            <p className="me__item">
              {user.province} {user.city}
            </p>
            <p className="me__item">
              {user.street} {user.reference}
            </p>

            <Link to="/me/edit" className="me__edit-btn">Editar información</Link>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Me;
