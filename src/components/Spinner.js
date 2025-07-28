const Spinner = () => {
    return (
        <div className="fixed inset-0 z-90 flex items-center justify-center bg-white/80">
            <div className="w-12 h-12 border-4 border-[#FF5C5C] border-t-transparent rounded-full animate-spin" />
        </div>

    );
};

export default Spinner