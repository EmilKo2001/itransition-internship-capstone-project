import { useContext, useState } from "react";

import axios from "axios";

import { Context } from "../../context/Context";
import Container from "../../components/Container";
import { Link } from "react-router-dom";

export default function CollectionAdd() {
  const { user } = useContext(Context);
  const [tab, setTab] = useState();

  return (
    <div>
      <Container>
        {/* <div role="tablist" className="tabs tabs-boxed">
        <a role="tab" className="tab">
          Collections
        </a>
        <a role="tab" className="tab tab-active">
          Tab 2
        </a>
        <a role="tab" className="tab">
          Tab 3
        </a>
      </div> */}
        <div className="mb-5 flex items-center gap-4 lg:mb-7	">
          <h2 className="text-xl lg:text-4xl">Collections</h2>{" "}
          <Link className="btn btn-primary" to="/admin/collections-new">
            Add11
          </Link>
        </div>
      </Container>
    </div>
  );
}
