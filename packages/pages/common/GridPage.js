import React from 'react';
import useBreakpoint from "@packages/hooks/useBreakpoint";
import { Row,Col } from "@packages/core/Grid";

const Page = React.forwardRef(function (props, ref) {
    const screens = useBreakpoint();

    console.log(Object.entries(screens));

    return <Row>
        <Col span={12}>我是谁</Col>
        <Col span={12}>我是谁</Col>
    </Row>
});

export default Page;