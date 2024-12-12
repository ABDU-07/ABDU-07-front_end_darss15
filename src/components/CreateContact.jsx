import useGetInputValues from "../hooks/useGetInputValues";
import { useCallback, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

export default function CreateContact({ setContacts, contacts }) {
    const navigate = useNavigate();
    const { id } = useParams();

    const { values, handleChange, resetHandler } = useGetInputValues({
        name: "",
        phone: "",
    });
    useEffect(() => {
        if (location.pathname !== "/create-contact") {
            const contact = contacts.find((c) => c.id === parseInt(id));
            console.log("2:", contact);
            handleChange({ target: { name: "name", value: contact.name } });
            handleChange({ target: { name: "phone", value: contact.phone } });
        }
    }, []);

    const bosilganda = useCallback((e) => {
        e.preventDefault();
        const a = new FormData(e.target);

        if (location.pathname === "/create-contact") {
            const contact = {
                id: Date.now(),
                name: a.get("name"),
                phone: a.get("phone"),
            };
            console.log(contact);

            setContacts([...contacts, contact]);
        } else {
            const contact = {
                id: parseInt(id),
                name: a.get("name"),
                phone: a.get("phone"),
            };

            console.log("id", id);
            console.log(contact);

            const updatedContacts = contacts.map((c) =>
                c.id === contact.id ? contact : c
            );
            console.log("Updated Contacts", updatedContacts);

            setContacts(updatedContacts);
        }

        navigate("/");
    });

    return (
        <div className="flex flex-col items-center">
            <h1 className="text-3xl font-bold">
                {location.pathname === "/create-contact" ? "Add" : "Edit"}{" "}
                Contact
            </h1>
            <form className="flex flex-col mt-3" onSubmit={bosilganda}>
                <input
                    className="w-[500px] h-[50px] my-2 rounded-xl bg-slate-200"
                    type="text"
                    placeholder="Name"
                    value={values.name}
                    onChange={handleChange}
                    name="name"
                />
                <input
                    className="w-[500px] h-[50px] my-2 rounded-xl bg-slate-200"
                    type="phone"
                    placeholder="Phone"
                    value={values.phone}
                    onChange={handleChange}
                    name="phone"
                />
                <button
                    type="submit"
                    className="bg-slate-500 px-5 rounded-xl w-[300px] h-[40px] flex flex-col items-center justify-center font-medium mx-auto my-4 hover:bg-slate-600"
                >
                    {location.pathname === "/create-contact" ? "Add" : "Edit"}
                </button>
            </form>
        </div>
    );
}
