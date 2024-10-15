function LoadingFeedback() {
  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center">
      <div className="text-center">
        <div className="inline-block animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-white mb-4"></div>
        <p className="text-lg">Cargando...</p>
      </div>
    </div>
  );
}

export default LoadingFeedback;
