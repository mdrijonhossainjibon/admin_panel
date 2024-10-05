import CurrenciesForm from "../../form";

import { useHistory, useParams } from "react-router-dom";
import { CurrencyRouteParams, RouteParams, Routes } from "../../../../../../constants/routes";
 

export default function CurrencyDetailsEdit() {
  const history = useHistory();
  const { code } = useParams<RouteParams<CurrencyRouteParams>>();

  const redirectToInfo = () => {
    //toInfo(Routes.withParams.CurrenciesDetails({ code }));
    history.push(Routes.withParams.CurrenciesDetails({ code }));
  };

  return <CurrenciesForm   onCompleted={redirectToInfo} />;
}
