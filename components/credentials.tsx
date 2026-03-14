import Image from "next/image";
import SkillList from "./skillList";

function Credentials() {
    return (
        <div className="p-6 rounded-xl shadow my-20">
            <div className="flex items-center gap-4">
                <div className="border rounded-xl overflow-hidden shadow-foreground/20 m-6">
                <Image src="/images/louise.jpg"
                    alt="Louise"
                    width={350} height={250}
                    className=""
                    />
                </div>
                <SkillList />
            </div>
        </div>
    );
}

export default Credentials;