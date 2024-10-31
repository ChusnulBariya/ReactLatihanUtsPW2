import React, {useEffect, useState} from "react"
import axios from "axios"
import { NavLink } from "react-router-dom";

export default function List(){
    const[mahasiswa, setMahasiswa] = useState([])

    useEffect(() => {
        axios
        .get('https://latihan-uts-pw-2.vercel.app/api/api/mahasiswa')
        .then((response) => {
            console.log(response.data.result)
            setMahasiswa(response.data.result)
        })
        .catch((error) => {
            console.log('Error: ', error);
        })
    }, []);

    //fungsi untuk menghapus mahasiswa berdasarkan ID dengan konfirmasi SweetAlert2
        const handleDelete = (id, nama) => {
            Swal.fire({
               title : "Are you sure?",
               text : `You wan't be able to revert this! Fakultas: ${nama}`, 
               icon : "warning",
               showCancelButton: true, confirmButtonColor: "#3085d6", cancelButtonColor: "#d33",
               confirmButtonText: "yes, delete it!",
            }).then((result) => {
                if(result.isConfirmed){
                    //lakukan pengahapusan jika dikonfirmasi 
                    axios
                    .delete(`https://latihan-uts-pw-2.vercel.app/api/api/mahasiswa/${id}`)
                    .then(() => {
                        //hapus mahasiswa dari state setelah suskes dihapus dari server
                        setMahasiswa(mahasiswa.filter((mahasiswa) => mahasiswa.id !== id));
                        //tampilkan notifikasi sukses
                        Swal.fire("Delete!", "Your data has been deleted.", "success")
                    })
                    .catch((error) => {
                        console.error("Error deleting data:", error); //mengenai error 
                        Swal.fire(
                            "Error",
                            "there was an issue deleeting the data.", 
                            "error"
                        );
                    });
                }
            });
    }
    return(
        <>
        <h2>List mahasiswa</h2>
        
       {/*Tombol Tambah Fakultas */}
      <NavLink to="/mahasiswa/create" className="btn btn-primary my-4">
        Create
      </NavLink>
      <table className="table">
            <thead>
                <tr>
                    <th>Nama mahasiswa</th>
                    <th>npm</th>
                    <th>tanggal lahir</th>
                    <th>prodi</th>
                    <th>#</th>
                </tr>
            </thead>
            <tbody>
            {mahasiswa.map((data) => (
                <tr key={data.id}>
                    <td>{data.nama}</td>
                    <td>{data.npm}</td>
                    <td>{data.tanggal_lahir}</td>
                    <td>{data.prodi}</td>
                    
                    <td>
                    <div className="btn-group" role="group" aria-label="Action buttons">
                        <NavLink to={`/mahasiswa/edit/${data.id}`} className="btn btn-warning">
                            Edit
                        </NavLink>
                        <button
                        onClick={() => handleDelete(data.id, data.namaMahasiswa)}
                        className="btn btn-danger">
                            Delete
                        </button>
                     </div>
                    </td>
                        
                    </tr>
                    
                ))} 
                
            </tbody>
             
        </table>
        </>
    )

    
   
    














}