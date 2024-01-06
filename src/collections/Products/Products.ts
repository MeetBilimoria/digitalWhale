import { CollectionConfig } from 'payload/types'
import { PRODUCT_CATEGORIES } from '../../config'

export const Products: CollectionConfig = {
  slug: "products",
  admin: {
    useAsTitle: "name"
  },
  access: {},
  fields: [
    {
      name: "user",
      type: "relationship",
      relationTo: "users",
      required: true,
      hasMany: false,
      admin: {
        condition: () => false
      }
    },
    {
      name: "name",
      label: "Name",
      type: "text",
      required: true,
    },
    {
        name: "description",
        label: "Products Details",
        type: "textarea",
        required: true,
      },
      {
        name: "Price",
        label: "Price in Rupess",
        min:0,
        max:5000,
        type:'number',
        required:true,

      },
      {
        name:'category',
        label:"category",
        type:"select",
        options:PRODUCT_CATEGORIES.map(({label,value})=>({label,value})),
        required:true,
      },
      {
        name: 'product_files',
        label: 'Product file(s)',
        type: 'relationship',
        required: true,
        relationTo: 'product_files',
        hasMany: false,
      },
{
    name:"approvedForSale",
    label:"product Status",
    type: "select",
    defaultValue:"pending",
    access:{
        create: ({req}) => req.user.role === "admin",
        read: ({req}) => req.user.role === "admin",
        update: ({req}) => req.user.role === "admin"
    },
    options:[
        {
            label:"pending verification",
            value:"pending"
        },
        {
            label:"approved",
            value:"approved",
        },
        {
            label:"Denied",
            value:'Denied',
        }
    ]
},
{
    name:"pricedId",
    access:{
        create:()=>false,
        read:() =>false,
        update:()=>false
    },
    type:"text",
    admin:{hidden:true}
},
{
    name:"stripId",
    access:{
        create:()=>false,
        read:() =>false,
        update:()=>false
    },
    type:"text",
    admin:{hidden:true}
},
{
    name:"images",
    type:"array",
    label:"Product images",
    minRows:1,
    maxRows:4,
    required:true,
    labels:{
        singular:"image",
        plural:"images",
    },
    fields:[
        {
            name:"images",
            type:"upload",
            relationTo:"media",
            required:true,
        }
    ]
}



     
  ]
};
