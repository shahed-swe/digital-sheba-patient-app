import { useEffect } from "react";
import { Layout } from "../../components/layout";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { Requests } from '../../utils/HTTP/Index'
import { Toastify } from "../../components/toastify";
import { useHistory } from "react-router-dom";

const Registration = () => {
    const { register, handleSubmit } = useForm()
    const history = useHistory()

    useEffect(() => {
        const token = localStorage.getItem('token')
        localStorage.setItem('language', 'en')
        if (token) history.push('/')
    }, [history])

    const onSubmit = async (data) => {
        try {
            const formData = {
                email: data.email,
                first_name: data.first_name,
                last_name: data.last_name,
                password: data.password,
                age: data.age,
                address: data.address,
                is_patient: true,
                confirm_password: data.confirm_password
            }

            console.log(formData)
            const response = await Requests.Authentication.Registration(formData)
            if(response.status === 201){
                Toastify.Success("Successfully Registered")
                history.push('/login')
            }
        } catch (error) {
            if(error){
                Toastify.Error("Credential Error")
            }
        }
    }

    return (
        <Layout>
            <section className="bg-white-900  p-2">
                <div className="px-0 py-20 mx-auto max-w-7xl sm:px-4">
                    <div className="w-full px-4 pt-5 pb-6 mx-auto mt-2 mb-6 bg-white rounded-none shadow-xl sm:rounded-lg sm:w-10/12 md:w-8/12 lg:w-6/12 xl:w-12/12 sm:px-6">
                        <h1 className="mb-4 text-lg font-semibold text-left text-gray-900">Registration</h1>
                        <form className="mb-8 space-y-3" onSubmit={handleSubmit(onSubmit)}>
                            <label className="block">
                                <span className="block mb-1 text-xs font-medium text-gray-700">Your Email</span>
                                <input className="form-input" type="email" placeholder="Ex. james@bond.com" {...register("email", { required: "Email is required" })} />
                            </label>
                            <div className="grid grid-cols-1 gap-2 md:grid-cols-3 lg:grid-cols-2 xl:grid-cols-2">
                                <label className="block">
                                    <span className="block mb-1 text-xs font-medium text-gray-700 xl:col-span-6">FIrst Name</span>
                                    <input className="form-input" type="text" placeholder="First Name" {...register("first_name", { required: "First Name is required" })} />
                                </label>
                                <label className="block">
                                    <span className="block mb-1 text-xs font-medium text-gray-700">Last Name</span>
                                    <input className="form-input" type="text" placeholder="Last Name" {...register("last_name", { required: "Last Name is required" })} />
                                </label>
                            </div>
                            
                            <label className="block">
                                <span className="block mb-1 text-xs font-medium text-gray-700">Age</span>
                                <input className="form-input" type="number" placeholder="Age" {...register("age", { required: "Age is required" })} />
                            </label>
                            <label className="block">
                                <span className="block mb-1 text-xs font-medium text-gray-700">Address</span>
                                <textarea className="form-input" type="text" placeholder="Address" {...register("address", { required: "Address is required" })} />
                            </label>
                            <label className="block">
                                <span className="block mb-1 text-xs font-medium text-gray-700">Your Password</span>
                                <input className="form-input" type="password" placeholder="••••••••" {...register('password', { required: "Password is required" })} />
                            </label>
                            <label className="block">
                                <span className="block mb-1 text-xs font-medium text-gray-700">Confirm Password</span>
                                <input className="form-input" type="password" placeholder="••••••••" {...register('confirm_password', { required: "Confirm Password is required" })} />
                            </label>
                            <button type="submit" className="w-full py-3 mt-1 btn btn-primary">Registration</button>
                        </form>
                    </div>
                    <p className="mb-4 text-xs text-center text-gray-400">
                        <span className="text-purple-500 hover:text-purple-400 font-semibold">Already have an account? <Link classNameName="underline" to="/login">Login</Link></span>
                    </p>
                </div>
                
            </section>
        </Layout>
    );
}

export default Registration;



