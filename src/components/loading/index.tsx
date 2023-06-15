import module from "./style.module.css";

const Loading = () => {
  return (
    <div className={`${module.loading__container} flex column gap-row-2 j_center a_center`}>
      <div className={module.loading__ball}></div>
      <span className={module.loading__text}>loading...</span>
    </div>
  );
};

export default Loading;