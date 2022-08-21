import React, { useState } from "react";
import { Collapse, Checkbox } from "antd";

const { Panel } = Collapse;

const CheckBox = (props) => {
  const [checked, setChecked] = useState([]);

  const handleToggle = (value) => {
    //누른 것의 index를 구하고
    const currentIndex = checked.indexOf(value);

    //전체 checked된 state에서
    const newChecked = [...checked];

    //현재 누른 checkbox가 이미 있다면 빼주고
    //없다면 state에 넣어준다
    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    setChecked(newChecked);
    props.handleFilters(newChecked);
  };

  const renderCheckboxLists = () => {
    return (
      props.list &&
      props.list.map((value, idx) => (
        <React.Fragment key={idx}>
          <Checkbox
            onChange={() => handleToggle(value._id)}
            checked={checked.indexOf(value._id) === -1 ? false : true}
          >
            <span>{value.name}</span>
          </Checkbox>
        </React.Fragment>
      ))
    );
  };

  return (
    <div>
      <Collapse defaultActiveKey={["0"]}>
        <Panel header="Continents" key="1">
          {renderCheckboxLists()}
        </Panel>
      </Collapse>
    </div>
  );
};

export default CheckBox;
