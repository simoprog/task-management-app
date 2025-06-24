import LoadingSpinner from "./LoadingSpinner";

const LoadingState = () => {
  return (
    <div className="max-w-2xl mx-auto py-8">
      <div className="flex items-center justify-center py-12">
        <LoadingSpinner size="md" />
      </div>
    </div>
  );
};
export default LoadingState;
