import React, {useState} from 'react';
import axios from 'axios';


const AddNewProduct = (props)=>{

        const [formState , setFormState] = useState({
            name:'',
            units:'',
            unitPrice:0,
            description:'',
            minPrice:0
        
        })

        //diffrent state for file
        const [file,setFile] = useState('');
        const [fileName, setFileName] = useState('')

        const {name,units,unitPrice,description,minPrice} = formState;

       const onChange =(event)=>{
            setFormState({
                ...formState,
               [event.target.name]:event.target.value
            })

       }

       const fileOnChange =(event)=>{
        setFile([...file, event.target.files[0]]);
        setFileName(event.target.files[0].name);

   }

  const onSubmit = async (event) =>{
      event.preventDefault();

      const formData = new FormData();
     formData.append('file', file);
      console.log(formData)
      

     try {
        console.log(formData);
       const res= await axios.post(`/api/product`, {
            name,
            units,
            unitPrice,
            minPrice,
            description,
            formData
        },
        {headers:{'Content-Type':'multipart/form-data'}})
        if(res){
            console.log('uploaded');

        }
     } catch (err) {
         console.log(err.response);
     }

  }


   return(
        <div className="ov-add-new-product-cont ov-containers">
            <form  className="row" onSubmit={onSubmit}>
                <div className="col-lg-4 col-md-4" >

                    <div className="form-group">
                    <input  type="text" placeholder="Product Name" className="form-control"
                     name="name" value={name}  autoComplete="off" onChange={onChange} />
                     </div>
                     <div className="form-group">
                     <input  type="text" placeholder="Units" className="form-control"
                     name="units" value={units}  autoComplete="off" onChange={onChange} />
                     </div>

                     <div className="form-group">
                     <input  type="number" placeholder="Unit Price" className="form-control"
                     name="unitPrice" value={unitPrice}  autoComplete="off" onChange={onChange} />
                     </div>

                     <div className="form-group">
                     <input  type="number" placeholder="min Price" className="form-control"
                     name="minPrice" value={minPrice}  autoComplete="off" onChange={onChange} />
                     </div>

                     

                     <div className="form-group">
                     <textarea  placeholder="description" className="form-control"
                     name="description" value={description}  autoComplete="off" onChange={onChange} />
                     </div>

                </div>
               
                <div className="col-lg-4 col-md-4" >

                    <input type="file"  onChange={fileOnChange}  />
                   {`name:${fileName}`}

                </div>

                <button type="submit" className="btn btn-warning btn-block" >SUBMIT</button>
            </form>

        </div>
   )

}

export default AddNewProduct;