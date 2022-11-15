import { useForm } from "react-hook-form"

export default function Contact() {
    const { register, formState: { errors }, handleSubmit, reset} = useForm()

    function onSubmit(data) {
        console.log(data)
        reset()
    }

    return (
        <main>
           <h2>Contact</h2>

           <form onSubmit={handleSubmit(onSubmit)}>
                <label htmlFor="name">Name
                    <input
                        id="name" 
                        type="text"
                        name="name"
                        {...register("name", {required: "This input is required"})}
                        aria-invalid={errors.name ? "true" : "false"} 
                        placeholder="Your full name"
                    />
                    {errors.name && <span role="alert">{errors.name?.message}</span>}
                </label>   

                <label htmlFor="email">E-mail
                    <input
                        id="email" 
                        type="text"
                        name="email"
                        {...register("email", {required: "This input is required"})}
                        aria-invalid={errors.email ? "true" : "false"}
                        placeholder="Your e-mail adress"
                    />
                    {errors.email && <span role="alert">{errors.email?.message}</span>}
                </label>


                <label htmlFor="subject">Subject
                    <select 
                        id="subject" 
                        name="subject"
                        {...register("subject", {required: "This input is required"})}
                        aria-invalid={errors.subject ? "true" : "false"}
                    >
                        <option className="songformwrapper_label_select_option" value="">--Please Select--</option>
                        <option className="songformwrapper_label_select_option" value="question">Question</option>
                        <option className="songformwrapper_label_select_option" value="contact">Contact Me</option>
                        <option className="songformwrapper_label_select_option" value=""></option>
                        <option className="songformwrapper_label_select_option" value="other">Other</option>
                    </select>
                    {errors.subject && <span role="alert">{errors.subject?.message}</span>}
                </label>


                <label htmlFor="message">Message
                    <input
                        id="message"
                        type="text"
                        name="message"
                        {...register("message", {required: "This input is required"})}
                        aria-invalid={errors.message ? "true" : "false"}
                        placeholder="Your Message"
                    />
                    {errors.message && <span role="alert">{errors.message?.message}</span>}
                </label>
                <button>Send</button>
            </form>

        </main>
    )
}