import PropTypes from 'prop-types';
import axios from 'axios'
import { useCallback, useEffect, useState } from "react";
import { backendUrl, currency } from '../lib/config'
import { toast } from 'react-toastify'

const CATEGORIES = ["Mountains", "Deserts", "Beach"]

const List = ({ token }) => {
  const [list, setList] = useState([])
  const [editing, setEditing] = useState(null) // product being edited
  const [saving, setSaving] = useState(false)
  const [newImages, setNewImages] = useState({})
  const [search, setSearch] = useState("")
  const [categoryFilter, setCategoryFilter] = useState("All")

  const fetchList = useCallback(async () => {
    try {
      const response = await axios.get(backendUrl + "/api/product/list", { headers: { token } })
      if (response.data.success) {
        setList(response.data.products)
      } else {
        toast.error(response.data.message)
      }
    } catch (error) {
      console.log(error)
      toast.error(error.message)
    }
  }, [token])

  useEffect(() => { fetchList() }, [fetchList])

  const removeProduct = async (id) => {
    if (!window.confirm("Delete this trip?")) return
    try {
      const response = await axios.post(backendUrl + "/api/product/remove", { id }, { headers: { token } })
      if (response.data.success) {
        toast.success(response.data.message)
        await fetchList()
      } else {
        toast.error(response.data.message)
      }
    } catch (error) {
      console.log(error)
      toast.error(error.message)
    }
  }

  const openEdit = (item) => {
    setNewImages({})
    setEditing({
      _id: item._id,
      name: item.name || "",
      category: item.category || "Mountains",
      price: item.price ?? "",
      originalPrice: item.originalPrice ?? "",
      link: item.link || "",
      description: item.description || "",
      image: item.image || [],
    })
  }

  const saveEdit = async () => {
    setSaving(true)
    try {
      const formData = new FormData()
      formData.append("id", editing._id)
      formData.append("name", editing.name)
      formData.append("category", editing.category)
      formData.append("price", editing.price)
      formData.append("originalPrice", editing.originalPrice)
      formData.append("link", editing.link)
      formData.append("description", editing.description)
      Object.entries(newImages).forEach(([key, file]) => file && formData.append(key, file))

      const response = await axios.post(backendUrl + "/api/product/update", formData, { headers: { token } })
      if (response.data.success) {
        toast.success(response.data.message)
        setEditing(null)
        await fetchList()
      } else {
        toast.error(response.data.message)
      }
    } catch (error) {
      console.log(error)
      toast.error(error.message)
    } finally {
      setSaving(false)
    }
  }

  const filteredList = list
    .filter((item) => categoryFilter === "All" || item.category === categoryFilter)
    .filter((item) => item.name?.toLowerCase().includes(search.toLowerCase()))
    .slice()
    .sort((a, b) => new Date(b.date || 0) - new Date(a.date || 0))

  return (
    <>
      <div className='mb-6'><p className='eyebrow text-[10px] text-[#C2913B] mb-1'>Journeys</p><h2 className='serif text-3xl text-[#221A10]'>All trips</h2></div>

      {/* Search + category filter */}
      <div className='flex flex-col sm:flex-row gap-3 mb-5'>
        <input
          type='text'
          placeholder='Search trips by name…'
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className='flex-1 px-3.5 py-2.5 text-sm'
        />
        <select
          value={categoryFilter}
          onChange={(e) => setCategoryFilter(e.target.value)}
          className='px-3 py-2.5 text-sm sm:w-48'
        >
          <option value='All'>All categories</option>
          {CATEGORIES.map((c) => <option key={c} value={c}>{c}</option>)}
        </select>
      </div>

      <div className='flex flex-col gap-2'>
        {/* Table header */}
        <div className='hidden md:grid grid-cols-[1fr_3fr_1.5fr_1.5fr_1.5fr] items-center py-2.5 px-3 bg-[#221A10] text-[#E3B95C] eyebrow text-[9px]'>
          <span>Image</span>
          <span>Name</span>
          <span>Category</span>
          <span>Price</span>
          <span className='text-center'>Actions</span>
        </div>

        {/* Rows */}
        {filteredList.map((item, index) => (
          <div key={index} className='grid grid-cols-[1fr_3fr_1.5fr] md:grid-cols-[1fr_3fr_1.5fr_1.5fr_1.5fr] items-center gap-2 py-2.5 px-3 border border-[#221A10]/10 text-sm bg-[#FFFDF8] hover:bg-[#F1E8D6]/40 transition-colors'>
            <img src={item.image[0]} alt="" className='w-14 h-14 object-cover' />
            <p className='font-medium capitalize'>{item.name}</p>
            <p className='hidden md:block'>{item.category}</p>
            <p>{currency}{Number(item.price).toLocaleString("en-IN")}</p>
            <div className='flex items-center justify-end md:justify-center gap-2'>
              <button onClick={() => openEdit(item)} className='px-4 py-1.5 eyebrow text-[9px] bg-[#C2913B] text-[#221A10] hover:bg-[#E3B95C] transition-colors'>Edit</button>
              <button onClick={() => removeProduct(item._id)} className='px-4 py-1.5 eyebrow text-[9px] border border-[#221A10]/20 text-[#221A10]/60 hover:border-red-500 hover:text-red-600 transition-colors'>Delete</button>
            </div>
          </div>
        ))}
        {filteredList.length === 0 && list.length > 0 && (
          <p className='text-[#221A10]/40 text-sm py-6 text-center'>No trips match your search or filter.</p>
        )}
        {list.length === 0 && (
          <p className='text-[#221A10]/40 text-sm py-6 text-center'>No trips yet. Add one from the “Add Trip” page, or run the seed script (backend/seed/seed.js).</p>
        )}
      </div>

      {/* Edit modal */}
      {editing && (
        <div className='fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-3'>
          <div className='bg-[#FBF7EE] w-full max-w-lg shadow-2xl max-h-[92vh] overflow-y-auto'>
            <div className='flex items-center justify-between px-5 py-4 bg-[#221A10]'>
              <h3 className='serif text-xl text-[#E3B95C]'>Edit trip</h3>
              <button onClick={() => setEditing(null)} className='text-2xl leading-none text-[#FBF7EE]/70 hover:text-[#FBF7EE]'>&times;</button>
            </div>

            <div className='p-5 space-y-3'>
              <div>
                <label className='block text-sm mb-1 font-medium'>Trip Name</label>
                <input className='w-full border rounded px-3 py-2' value={editing.name}
                  onChange={(e) => setEditing({ ...editing, name: e.target.value })} />
              </div>

              <div className='flex gap-3'>
                <div className='flex-1'>
                  <label className='block text-sm mb-1 font-medium'>Category</label>
                  <select className='w-full border rounded px-3 py-2' value={editing.category}
                    onChange={(e) => setEditing({ ...editing, category: e.target.value })}>
                    {CATEGORIES.map((c) => <option key={c} value={c}>{c}</option>)}
                  </select>
                </div>
                <div className='w-28'>
                  <label className='block text-sm mb-1 font-medium'>Price</label>
                  <input type='number' className='w-full border rounded px-3 py-2' value={editing.price}
                    onChange={(e) => setEditing({ ...editing, price: e.target.value })} />
                </div>
                <div className='w-28'>
                  <label className='block text-sm mb-1 font-medium'>Original</label>
                  <input type='number' className='w-full border rounded px-3 py-2' value={editing.originalPrice}
                    onChange={(e) => setEditing({ ...editing, originalPrice: e.target.value })} />
                </div>
              </div>

              <div>
                <label className='block text-sm mb-1 font-medium'>Brochure Link</label>
                <input className='w-full border rounded px-3 py-2' value={editing.link}
                  onChange={(e) => setEditing({ ...editing, link: e.target.value })} />
              </div>

              <div>
                <label className='block text-sm mb-1 font-medium'>Description</label>
                <textarea rows='3' className='w-full border rounded px-3 py-2' value={editing.description}
                  onChange={(e) => setEditing({ ...editing, description: e.target.value })} />
              </div>

              <div>
                <label className='block text-sm mb-1 font-medium'>Replace Images (optional)</label>
                <div className='flex gap-2 items-center'>
                  {editing.image.slice(0, 4).map((img, i) => (
                    <img key={i} src={img} className='w-12 h-12 object-cover rounded border' alt='' />
                  ))}
                </div>
                <input type='file' multiple accept='image/*' className='mt-2 text-sm'
                  onChange={(e) => {
                    const files = Array.from(e.target.files).slice(0, 4)
                    const map = {}
                    files.forEach((f, i) => { map[`image${i + 1}`] = f })
                    setNewImages(map)
                  }} />
                <p className='text-xs text-gray-400 mt-1'>Leave empty to keep current images.</p>
              </div>
            </div>

            <div className='flex justify-end gap-2 px-5 py-3 border-t'>
              <button onClick={() => setEditing(null)} className='px-5 py-2.5 eyebrow text-[10px] border border-[#221A10]/25 text-[#221A10]/60 hover:border-[#221A10] transition-colors'>Cancel</button>
              <button onClick={saveEdit} disabled={saving}
                className={`px-6 py-2.5 eyebrow text-[10px] ${saving ? 'bg-[#221A10]/40 text-[#FBF7EE]' : 'bg-[#221A10] text-[#E3B95C] hover:bg-[#C2913B] hover:text-[#221A10]'} transition-colors`}>
                {saving ? 'Saving...' : 'Save Changes'}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default List

List.propTypes = {token: PropTypes.string.isRequired};
