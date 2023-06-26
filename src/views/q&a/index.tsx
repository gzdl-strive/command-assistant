import module from "./style.module.css";

function QA() {
  return (
    <div className={`${module.container} grid gap-col-1-5`}>
      <aside className={module.popular}></aside>
      <main className={module.chat}></main>
      <aside className={module.history}></aside>
    </div>
  );
}

export default QA;