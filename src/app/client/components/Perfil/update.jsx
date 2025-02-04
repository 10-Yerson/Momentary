export default function InfoUser() {
    return (
        <div className="w-full grid place-content-center">
            
            <div
                className="relative flex justify-center h-[300px] w-[160px]  border-4 border-black rounded-2xl bg-white"
                
            >
                <span
                    className="border border-black bg-black w-20 h-2 rounded-br-xl rounded-bl-xl"
                ></span>

                <span
                    className="absolute -right-2 top-14  border-4 border-black h-7 rounded-md"
                ></span>
                <span
                    className="absolute -right-2 bottom-36  border-4 border-black h-10 rounded-md"
                ></span>
            </div>

        </div>
    );
}
