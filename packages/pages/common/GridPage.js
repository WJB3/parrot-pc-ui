import React from 'react';
import useBreakpoint from "@packages/hooks/useBreakpoint";
import { Row,Col } from "@packages/core/Grid";

const Page = React.forwardRef(function (props, ref) {
   
    return <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
    <Col className="gutter-row" span={6}>
      <div  >col-6</div>
    </Col>
    <Col className="gutter-row" span={6}>
      <div  >col-6</div>
    </Col>
    <Col className="gutter-row" span={6}>
      <div >col-6</div>
    </Col>
    <Col className="gutter-row" span={6}>
      <div  >col-6</div>
    </Col>
  </Row>
});

export default Page;