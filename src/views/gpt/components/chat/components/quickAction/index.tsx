import SvgIcon from "@c/svg-icon";
import module from "./style.module.css";

const AICanList = [
  { id: "201", desc: "“AI伙伴可以做什么?”" },
  { id: "301", desc: "“AI伙伴可以做什么?”" },
  { id: "401", desc: "“AI伙伴可以做什么?”" },
  { id: "501", desc: "“AI伙伴可以做什么?”" },
  { id: "601", desc: "“AI伙伴可以做什么?”" },
  { id: "701", desc: "“AI伙伴可以做什么?”" },
];

function QuickAction() {
  return (
    <div className={module.container}>
      <h2>Hi 晚上好</h2>
      <p>我是你的专属AI伙伴，帮你答疑解惑提供灵感</p>
      <div>
        <span>你可以试着问我:</span>
        <div>
          <SvgIcon name="refresh"></SvgIcon>
          换一批
        </div>
      </div>
      {
        AICanList.length && AICanList.map(panel => {
          return <div className={module.panel} key={panel.id}>
            <h2>{panel.desc}</h2>
          </div>;
        })
      }
    </div>
  );
}

export default QuickAction;