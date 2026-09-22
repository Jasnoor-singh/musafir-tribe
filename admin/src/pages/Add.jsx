import PropTypes from 'prop-types';
import { useState } from "react";

import axios from 'axios'
import { backendUrl } from '../lib/config'
import { toast } from 'react-toastify'

const CATEGORIES = ["Mountains", "Deserts", "Beach"]

const Add = ({ token }) => {
    const [image1, setImage1] = useState(false)
    const [image2, setImage2] = useState(false)
    const [image3, setImage3] = useState(false)
    const [image4, setImage4] = useState(false)

    const [name, setName] = useState("")
    const [description, setDescription] = useState("")
    const [link, setLink] = useState("")
    const [price, setPrice] = useState("")
    const [originalPrice, setoriginalPrice] = useState("")
    const [category, setCategory] = useState("Mountains")
    const [submitting, setSubmitting] = useState(false)

    const images = [
        { value: image1, set: setImage1, id: "image1" },
        { value: image2, set: setImage2, id: "image2" },
        { value: image3, set: setImage3, id: "image3" },
        { value: image4, set: setImage4, id: "image4" },
    ]

    const onSubmitHandler = async (e) => {
        e.preventDefault();
        setSubmitting(true);
        try {
            const formData = new FormData();
            formData.append("name", name)
            formData.append("description", description)
            formData.append("link", link)
            formData.append("price", price)
            formData.append("originalPrice", originalPrice)
            formData.append("category", category)
            formData.append("subCategory", "Trip")
            formData.append("bestseller", false)
            formData.append("sizes", JSON.stringify([]))

            // Each image is appended only if it was actually chosen
            image1 && formData.append("image1", image1);
            image2 && formData.append("image2", image2);
            image3 && formData.append("image3", image3);
            image4 && formData.append("image4", image4);

            const response = await axios.post(backendUrl + "/api/product/add", formData, { headers: { token } })

            if (response.data.success) {
                toast.success(response.data.message)
                setName(""); setDescription(""); setLink("");
                setPrice(""); setoriginalPrice("");
                setImage1(false); setImage2(false); setImage3(false); setImage4(false);
            } else {
                toast.error(response.data.message)
            }
        } catch (error) {
            console.log(error)
            toast.error(error.message)
        } finally {
            setSubmitting(false)
        }
    }

    return (
        <div>
            <p className='eyebrow text-[10px] text-[#C2913B] mb-1'>Journeys</p>
            <h2 className='serif text-3xl text-[#221A10] mb-8'>Add a trip</h2>

            <form onSubmit={onSubmitHandler} className='bg-[#FFFDF8] border border-[#221A10]/10 p-6 sm:p-8 max-w-2xl space-y-6'>
                {/* Photos */}
                <div>
                    <p className='eyebrow text-[10px] text-[#221A10]/60 mb-3'>Trip photos <span className='normal-case tracking-normal font-normal text-[#221A10]/40'>(up to 4 — first one is the cover)</span></p>
                    <div className='flex gap-3 flex-wrap'>
                        {images.map(({ value, set, id }, i) => (
                            <label key={id} htmlFor={id}
                                className='w-24 h-24 border border-dashed border-[#221A10]/25 bg-[#FBF7EE] grid place-items-center cursor-pointer overflow-hidden hover:border-[#C2913B] transition-colors'>
                                {!value ? (
                                    <span className='text-center text-[10px] text-[#221A10]/40 px-1'>
                                        {i === 0 ? "Cover photo" : "Add photo"}
                                    </span>
                                ) : (
                                    <img src={URL.createObjectURL(value)} alt="" className='w-full h-full object-cover' />
                                )}
                                <input onChange={(e) => set(e.target.files[0])} type="file" accept="image/*" id={id} hidden />
                            </label>
                        ))}
                    </div>
                </div>

                <div>
                    <label className='eyebrow text-[10px] text-[#221A10]/60 block mb-2'>Trip name</label>
                    <input type="text" placeholder='e.g. Manali & Solang Valley Adventure' required
                        className='w-full px-3.5 py-3 text-sm'
                        onChange={(e) => setName(e.target.value)} value={name} />
                </div>

                <div>
                    <label className='eyebrow text-[10px] text-[#221A10]/60 block mb-2'>Brochure drive link</label>
                    <input type="text" placeholder='https://drive.google.com/…' required
                        className='w-full px-3.5 py-3 text-sm'
                        onChange={(e) => setLink(e.target.value)} value={link} />
                </div>

                <div>
                    <label className='eyebrow text-[10px] text-[#221A10]/60 block mb-2'>Description</label>
                    <textarea rows='4' placeholder='What makes this journey special — stays, highlights, what is included…' required
                        className='w-full px-3.5 py-3 text-sm'
                        onChange={(e) => setDescription(e.target.value)} value={description} />
                </div>

                <div className='grid grid-cols-1 sm:grid-cols-3 gap-4'>
                    <div>
                        <label className='eyebrow text-[10px] text-[#221A10]/60 block mb-2'>Category</label>
                        <select className='w-full px-3 py-3 text-sm' onChange={(e) => setCategory(e.target.value)} value={category}>
                            {CATEGORIES.map((c) => <option key={c} value={c}>{c}</option>)}
                        </select>
                    </div>
                    <div>
                        <label className='eyebrow text-[10px] text-[#221A10]/60 block mb-2'>Price (₹)</label>
                        <input type="number" placeholder='12999' required className='w-full px-3.5 py-3 text-sm'
                            onChange={(e) => setPrice(e.target.value)} value={price} />
                    </div>
                    <div>
                        <label className='eyebrow text-[10px] text-[#221A10]/60 block mb-2'>Original price (₹)</label>
                        <input type="number" placeholder='16999' className='w-full px-3.5 py-3 text-sm'
                            onChange={(e) => setoriginalPrice(e.target.value)} value={originalPrice} />
                    </div>
                </div>

                <button type="submit" disabled={submitting}
                    className={`eyebrow text-[11px] px-10 py-3.5 rounded-sm transition-colors duration-300 ${
                        submitting ? 'bg-[#221A10]/40 text-[#FBF7EE]' : 'bg-[#221A10] text-[#E3B95C] hover:bg-[#C2913B] hover:text-[#221A10]'
                    }`}>
                    {submitting ? 'Adding…' : 'Add trip'}
                </button>
            </form>
        </div>
    )
}

export default Add

Add.propTypes = {token: PropTypes.string.isRequired};
