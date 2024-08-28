import { useState } from "react";
import { IoSearchSharp } from "react-icons/io5";
import { toast } from "react-hot-toast";
import { ConversationState } from "../../state/conversationState";
import { IConversationType } from "../../interface/IConversationType";
const SearchInput = () => {
    const [search, setSearch] = useState("");
    const { conversations, setSelectedConversation } = ConversationState();
    const handleSearchSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!search) return;
        if (search.length < 3) {
            toast.error("Search name should be at least 3 characters long");
            setSearch("");
        }
        const conversation = conversations.find((c: IConversationType) => {
            return c.fullName.toLowerCase().includes(search.toLowerCase());
        });
        console.log(conversation);
        if (conversation) {
            setSelectedConversation(conversation);
            setSearch("");
        } else {
            toast.error("No user found with this name");
        }
    };
    return (
        <form className="flex items-center gap-2" onClick={handleSearchSubmit}>
            <input
                type="text"
                placeholder="Search..."
                className="input-sm md:input input-bordered rounded-full w-full"
                value={search}
                onChange={(e) => {
                    setSearch(e.target.value);
                }}
            />
            <button
                type="submit"
                className="btn md:btn-md btn-sm btn-circle bg-sky-500 text-white"
            >
                <IoSearchSharp className="w-4 h-4 md:w-6 md:h-6 outline-none" />
            </button>
        </form>
    );
};

export default SearchInput;
