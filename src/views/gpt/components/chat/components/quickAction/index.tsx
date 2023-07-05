import SvgIcon from "@c/svg-icon";
import module from "./style.module.css";

type QuickActionProps = {
  askInput: (content: string) => void;
}

const AICanList = [
  { id: "201", title: "“AI伙伴可以做什么?”" },
  { id: "301", title: "“帮我写一篇关于XXXX的古诗?”" },
  { id: "401", title: "“拖延症重度患者怎样自救?”" },
  { id: "501", title: "“帮我给我的哈士奇取一个显得聪明的名字?”" },
  { id: "601", title: "“为什么深海里的鱼会发光?”" },
  { id: "701", title: "“测试一下长文本长文本长文本长文本?”" },
];

function QuickAction(props: QuickActionProps) {

  // 试一试
  const handleTry = (title: string) => {
    props.askInput(title);
  };

  return (
    <div className={`${module.container} flex column gap-row-1`}>
      <h2 className={module.title}>Hi 早上好</h2>
      <p className={module.subtitle}>我是你的专属AI伙伴，帮你答疑解惑提供灵感</p>
      <div className="flex j_between">
        <span className={module.desc}>你可以试着问我:</span>
        <div className={module.refresh__container}>
          <SvgIcon name="refresh" className={module.refresh__icon}></SvgIcon>
          <span className={module.refresh__text}>换一批</span>
        </div>
      </div>
      <section className={`${module.panelList} grid gap-col-1 gap-row-1`}>
        {
          AICanList.length && AICanList.map(panel => {
            return <div
              className={`${module.panel} flex column gap-row-1-5`}
              key={panel.id}
              onClick={() => handleTry(panel.title)}
            >
              <h3 className={`${module.panel__title}`}>{panel.title}</h3>
              <button className={module.panel__btn}>试一试</button>
            </div>;
          })
        }
      </section>
    </div>
  );
}

export default QuickAction;