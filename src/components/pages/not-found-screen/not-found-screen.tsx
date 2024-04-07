function NotFoundScreen() {
  return (
    <section className="error__screen" style={{textAlign: 'center', marginTop: '35vh'}}>
      <h1>Ошибка 404: Страница не найдена</h1>
      <button><a href="/">Вернуться на главную страницу</a></button>
    </section>
  );
}

export default NotFoundScreen;
