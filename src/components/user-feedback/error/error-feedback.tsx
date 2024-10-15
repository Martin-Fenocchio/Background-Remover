function ErrorFeedback({ error }: { error: { message: string } }) {
  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center">
      <div className="text-center">
        <h2 className="text-4xl mb-2">ERROR</h2>
        <p className="text-xl max-w-[500px]">{error.message}</p>
      </div>
    </div>
  );
}

export default ErrorFeedback;
