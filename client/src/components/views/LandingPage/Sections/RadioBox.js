import React, { useState } from 'react';
import { Collapse, Radio } from 'antd';

const { Panel } = Collapse;

const RadioBox = (props) => {
  const [value, setValue] = useState(0);

  const renderRadioBox = () => {
    return (
      props.list &&
      props.list.map((value) => (
        <Radio key={value._id} value={value._id}>
          {value.name}
        </Radio>
      ))
    );
  };

  const handleChange = (event) => {
    setValue(event.target.value);
    props.handleFilters(event.target.value);
  };

  return (
    <div>
      <Collapse defaultActiveKey={['1']}>
        <Panel header='this is panel header 2' key='1'>
          <Radio.Group onChange={handleChange} value={value}>
            {renderRadioBox()}
          </Radio.Group>
        </Panel>
      </Collapse>
    </div>
  );
};

export default RadioBox;
