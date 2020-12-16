import React, { useState, useCallback, useMemo } from 'react';
import TransitionR from '@packages/core/ReactTransitionGroup/Transition';
import Button from '@packages/core/Button';
import { Fade,Collapse } from '@packages/core/Transition';

let demo=[{id:0,name:"安徽省",parentId:null},{id:1,name:"合肥市",parentId:0},{id:2,name:"肥东县",parentId:1}];

let demo2=[
  {"T_ClassNo":"0","T_ParentID":null,"T_ClassName":"全部","T_ClassTotalName":"全部","I_RowNo":0,"T_ClassCode":0},
  {"T_ClassNo":"0001","T_ParentID":"0","T_ClassName":"济南","T_ClassTotalName":"济南","I_RowNo":1,"T_ClassCode":1},
  {"T_ClassNo":"00010001","T_ParentID":"0001","T_ClassName":"市中区","T_ClassTotalName":"济南\\市中区","I_RowNo":2,"T_ClassCode":1},
  {"T_ClassNo":"000100010001","T_ParentID":"00010001","T_ClassName":"舜玉街道","T_ClassTotalName":"济南\\市中区\\舜玉街道","I_RowNo":3,"T_ClassCode":1},
  {"T_ClassNo":"00010002","T_ParentID":"0001","T_ClassName":"槐荫区","T_ClassTotalName":"济南\\槐荫区","I_RowNo":4,"T_ClassCode":1},{"T_ClassNo":"00010003","T_ParentID":"0001","T_ClassName":"高新区","T_ClassTotalName":"济南\\高新区","I_RowNo":5,"T_ClassCode":1},{"T_ClassNo":"00010004","T_ParentID":"0001","T_ClassName":"历城区","T_ClassTotalName":"济南\\历城区","I_RowNo":6,"T_ClassCode":1},{"T_ClassNo":"00010005","T_ParentID":"0001","T_ClassName":"历下区1","T_ClassTotalName":"济南\\历下区1","I_RowNo":7,"T_ClassCode":1},{"T_ClassNo":"00010007","T_ParentID":"0001","T_ClassName":"济阳区","T_ClassTotalName":"济南\\济阳区","I_RowNo":8,"T_ClassCode":1},{"T_ClassNo":"00010008","T_ParentID":"0001","T_ClassName":"章丘区","T_ClassTotalName":"济南\\章丘区","I_RowNo":9,"T_ClassCode":1},{"T_ClassNo":"0002","T_ParentID":"0","T_ClassName":"青岛","T_ClassTotalName":"青岛","I_RowNo":10,"T_ClassCode":1},{"T_ClassNo":"00020001","T_ParentID":"0002","T_ClassName":"黄岛区","T_ClassTotalName":"青岛\\黄岛区","I_RowNo":11,"T_ClassCode":1},{"T_ClassNo":"0003","T_ParentID":"0","T_ClassName":"临沂","T_ClassTotalName":"临沂","I_RowNo":12,"T_ClassCode":1},{"T_ClassNo":"0004","T_ParentID":"0","T_ClassName":"滨州","T_ClassTotalName":"滨州","I_RowNo":13,"T_ClassCode":1},{"T_ClassNo":"0011","T_ParentID":"0","T_ClassName":"北京市","T_ClassTotalName":"北京市","I_RowNo":14,"T_ClassCode":110000},{"T_ClassNo":"0012","T_ParentID":"0","T_ClassName":"天津市","T_ClassTotalName":"天津市","I_RowNo":15,"T_ClassCode":120000},{"T_ClassNo":"0013","T_ParentID":"0","T_ClassName":"河北省","T_ClassTotalName":"河北省","I_RowNo":16,"T_ClassCode":130000},{"T_ClassNo":"0014","T_ParentID":"0","T_ClassName":"山西省","T_ClassTotalName":"山西省","I_RowNo":17,"T_ClassCode":140000},{"T_ClassNo":"0015","T_ParentID":"0","T_ClassName":"内蒙古自治区","T_ClassTotalName":"内蒙古自治区","I_RowNo":18,"T_ClassCode":150000},{"T_ClassNo":"0021","T_ParentID":"0","T_ClassName":"辽宁省","T_ClassTotalName":"辽宁省","I_RowNo":19,"T_ClassCode":210000},{"T_ClassNo":"0022","T_ParentID":"0","T_ClassName":"吉林省1","T_ClassTotalName":"吉林省1","I_RowNo":20,"T_ClassCode":220000},{"T_ClassNo":"0023","T_ParentID":"0","T_ClassName":"黑龙江省","T_ClassTotalName":"黑龙江省","I_RowNo":21,"T_ClassCode":230000},{"T_ClassNo":"0031","T_ParentID":"0","T_ClassName":"上海市2","T_ClassTotalName":"上海市2","I_RowNo":22,"T_ClassCode":310000},{"T_ClassNo":"0032","T_ParentID":"0","T_ClassName":"江苏省","T_ClassTotalName":"江苏省","I_RowNo":23,"T_ClassCode":320000},{"T_ClassNo":"0033","T_ParentID":"0","T_ClassName":"浙江省","T_ClassTotalName":"浙江省","I_RowNo":24,"T_ClassCode":330000},{"T_ClassNo":"0034","T_ParentID":"0","T_ClassName":"安徽省","T_ClassTotalName":"安徽省","I_RowNo":25,"T_ClassCode":340000},{"T_ClassNo":"0035","T_ParentID":"0","T_ClassName":"福建省","T_ClassTotalName":"福建省","I_RowNo":26,"T_ClassCode":350000},{"T_ClassNo":"0036","T_ParentID":"0","T_ClassName":"江西省","T_ClassTotalName":"江西省","I_RowNo":27,"T_ClassCode":360000},{"T_ClassNo":"0037","T_ParentID":"0","T_ClassName":"山东省","T_ClassTotalName":"山东省","I_RowNo":28,"T_ClassCode":370000},{"T_ClassNo":"0041","T_ParentID":"0","T_ClassName":"河南省","T_ClassTotalName":"河南省","I_RowNo":29,"T_ClassCode":410000},{"T_ClassNo":"0042","T_ParentID":"0","T_ClassName":"湖北省","T_ClassTotalName":"湖北省","I_RowNo":30,"T_ClassCode":420000},{"T_ClassNo":"0043","T_ParentID":"0","T_ClassName":"湖南省","T_ClassTotalName":"湖南省","I_RowNo":31,"T_ClassCode":430000},{"T_ClassNo":"0044","T_ParentID":"0","T_ClassName":"广东省","T_ClassTotalName":"广东省","I_RowNo":32,"T_ClassCode":440000},{"T_ClassNo":"0045","T_ParentID":"0","T_ClassName":"广西壮族自治区","T_ClassTotalName":"广西壮族自治区","I_RowNo":33,"T_ClassCode":450000},{"T_ClassNo":"0046","T_ParentID":"0","T_ClassName":"海南省","T_ClassTotalName":"海南省","I_RowNo":34,"T_ClassCode":460000},{"T_ClassNo":"0050","T_ParentID":"0","T_ClassName":"重庆市","T_ClassTotalName":"重庆市","I_RowNo":35,"T_ClassCode":500000},{"T_ClassNo":"0051","T_ParentID":"0","T_ClassName":"四川省","T_ClassTotalName":"四川省","I_RowNo":36,"T_ClassCode":510000},{"T_ClassNo":"0052","T_ParentID":"0","T_ClassName":"贵州省","T_ClassTotalName":"贵州省","I_RowNo":37,"T_ClassCode":520000},{"T_ClassNo":"0053","T_ParentID":"0","T_ClassName":"云南省","T_ClassTotalName":"云南省","I_RowNo":38,"T_ClassCode":530000},{"T_ClassNo":"0054","T_ParentID":"0","T_ClassName":"西藏自治区","T_ClassTotalName":"西藏自治区","I_RowNo":39,"T_ClassCode":540000},{"T_ClassNo":"0061","T_ParentID":"0","T_ClassName":"陕西省","T_ClassTotalName":"陕西省","I_RowNo":40,"T_ClassCode":610000},{"T_ClassNo":"0062","T_ParentID":"0","T_ClassName":"甘肃省1","T_ClassTotalName":"\\甘肃省1","I_RowNo":41,"T_ClassCode":620000},{"T_ClassNo":"0063","T_ParentID":"0","T_ClassName":"青海省","T_ClassTotalName":"青海省","I_RowNo":42,"T_ClassCode":630000},{"T_ClassNo":"0064","T_ParentID":"0","T_ClassName":"宁夏回族自治区","T_ClassTotalName":"宁夏回族自治区","I_RowNo":43,"T_ClassCode":640000},{"T_ClassNo":"0065","T_ParentID":"0","T_ClassName":"新疆维吾尔自治区","T_ClassTotalName":"新疆维吾尔自治区","I_RowNo":44,"T_ClassCode":650000},{"T_ClassNo":"0071","T_ParentID":"0","T_ClassName":"台湾省","T_ClassTotalName":"台湾省","I_RowNo":45,"T_ClassCode":710000},{"T_ClassNo":"0081","T_ParentID":"0","T_ClassName":"香港特别行政区","T_ClassTotalName":"香港特别行政区","I_RowNo":46,"T_ClassCode":810000},{"T_ClassNo":"0082","T_ParentID":"0","T_ClassName":"澳门特别行政区","T_ClassTotalName":"澳门特别行政区","I_RowNo":47,"T_ClassCode":820000}]

function treeData(source, id, parentId, children){   
  let cloneData = JSON.parse(JSON.stringify(source))
  return cloneData.filter(father=>{
      let branchArr = cloneData.filter(child => father[id] == child[parentId]);
      branchArr.length>0 ? father[children] = branchArr : ''
      return father[parentId] ==null        // 如果第一层不是parentId=0，请自行修改
  })
}

console.log(treeData(demo2, 'T_ClassNo', 'T_ParentID', 'children'))

export default function App() {

  const [visible, setVisible] = useState(false);

  const statusStyle = {
    exited: { opacity: 0 },
    entering: { opacity: 1 },
    entered: { opacity: 1 },
    exiting: { opacity: 0 }
  }

  return (
    <div>
      

      <Collapse visible={visible} timeout={5000}>
        <div
          style={{ background: 'red', width: 200, height: 200 }}
        >{"测试"}</div>
      </Collapse>

      <Button onClick={() => setVisible(!visible)}>显示</Button>

    </div>
  );
}

