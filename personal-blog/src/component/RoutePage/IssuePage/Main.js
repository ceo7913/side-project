import { store, view } from "@risingstack/react-easy-state";
import moment from "moment/moment";
import { useEffect } from "react";
import"./style/Clock.scss"
function getFormattedTime() {
    return moment()
      .format('hh:mm:ss A');
  }

export default view(() => {
    // create a local store which is NOT shared between component instances
    const clock = store({
      time: getFormattedTime(),
    });
    useEffect(() => {
        const id = setInterval(
          () => (clock.time = getFormattedTime()),
          1000,
        );
        return () => clearInterval(id);
      }, []);
    
      return <div className="clockDiv">{clock.time}</div>;
})
