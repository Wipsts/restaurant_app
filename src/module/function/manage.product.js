import {QUERY, getUser} from "../main"

class manageProduct{
    getDataUser(uiD, res){    
        if(sessionStorage.getItem('tagsIdsResponseUser') && JSON.parse(sessionStorage.getItem('tagsIdsResponseUser')).idUser === uiD){
            const tags = JSON.parse(sessionStorage.getItem('tagsIdsResponseUser'))
            res(tags)
        }else{
            QUERY('getEspecific', {'bd': "user", 'where': ['token', uiD]}, 1, response => {
                const tags = {
                    "idHistoric": response.data.idHistoric,
                    "idList": response.data.idList,
                    "idUser": uiD
                }
                sessionStorage.setItem('tagsIdsResponseUser', JSON.stringify(tags));
                res(response)
            })
        }
    }

    getListUser(idTag, type, res){
        if(type === "show" && sessionStorage.getItem('listOrderUser') && JSON.parse(sessionStorage.getItem('listOrderUser')).totalValue){
            const storage = JSON.parse(sessionStorage.getItem('listOrderUser'))
            res({data: {totalVal: storage.totalValue, product: JSON.parse(storage.list)}})
        }else{
            QUERY('getEspecific', {'bd': "list", 'where': ["documentID", idTag]}, 1, response => {           
                res(response)
            })
        }
    }

    getProduct(res){
        if(sessionStorage.getItem('sessionAllProduct') && JSON.parse(sessionStorage.getItem('sessionAllProduct'))[0]){
            const product = JSON.parse(sessionStorage.getItem('sessionAllProduct'))
            res(product)
        }else{
            QUERY('get', {'bd': "product", 'select': ""}, null, response => {           
                sessionStorage.setItem('sessionAllProduct', JSON.stringify(response));
                res(response)
            })
        }   
    }

    updateListUser(query, res){
        QUERY('update', {'bd': "list", 'update': query}, "null", response => {
            res(response)
        })
    }

    addToList(product, descriptionProduct, res){
        getUser(tokenUid => {
            this.getDataUser(tokenUid, dataUser => {
                this.getListUser(dataUser.idList, "add", dataList => {
                    const ProductList = dataList.data.product
                    const descriptionProductList = dataList.data.description
                    const newValueProduct =  parseFloat(dataList.data.totalVal) + parseFloat(product.data.val) 
                    ProductList.push(product.id)      
                    descriptionProductList.push(descriptionProduct)              
                    descriptionProduct = (descriptionProduct !== "") ? descriptionProduct : ""

                    const queryUpdate = {
                        "id": dataUser.idList,
                        "data": {
                            "product": ProductList,
                            "totalVal": newValueProduct,
                            "description": descriptionProductList
                        }
                    }
                    this.updateListUser(queryUpdate, responseResult => {
                        if(responseResult){
                            sessionStorage.setItem('listOrderUser', JSON.stringify({totalValue: newValueProduct, list: JSON.stringify(ProductList)}));
                        }

                        res(responseResult)
                    })
                })
            })            
        })
    }

    showListUser(res){
        getUser(tokenUid => {
            this.getProduct(listProduct => {
                this.getDataUser(tokenUid, dataUser => {
                    this.getListUser(dataUser.idList, "show", dataList => {
                        const productList = (dataList.data.product[0]) ? dataList.data.product : JSON.parse(dataList.data.product)
                        const totalValue = dataList.data.totalVal
                        const products = listProduct
                        res({idsProductList: productList, totalValue: totalValue, allProduct: products})
                    })
                })
            })
        })
    }

    removeToList(idProductRemove, listUser, res){
        getUser(tokenUid => {
            this.getDataUser(tokenUid, dataUser => {
                this.getListUser(dataUser.idList, "del", dataList => {
                    const returnRemoved = removeProduct(listUser)
                    const newProductList = returnRemoved.dataList
                    const newDescriptionProduct = removeDescriptionList(returnRemoved.positionProductRemoved, dataList.data.description)
                    const newValueProduct = getNewValueProduct(newProductList)

                    const queryUpdate = {
                        "id": dataUser.idList,
                        "data": {
                            "product": newProductList,
                            "totalVal": newValueProduct,
                            "description": newDescriptionProduct
                        }
                    }
                    this.updateListUser(queryUpdate, responseResult => {
                        if(responseResult){
                            sessionStorage.setItem('listOrderUser', JSON.stringify({totalValue: newValueProduct, list: JSON.stringify(newProductList)}));
                            res({remove: true, list: newProductList, totalValue: newValueProduct})
                        }else{
                            res({remove: false, list: ""})
                        }
                    })
                })
            })            
        })

        function getNewValueProduct(productList){
            var newValue = 0
            for (let i = 0; i < productList.length; i++) {
                newValue += parseFloat(productList[i])
            }
            
            return newValue
        }

        function removeProduct(listUser){
            const newProductList = listUser.map((data) => {
                if(data.id !== idProductRemove){
                    return data
                }else{
                    return undefined
                }
            })

            const positionProductRemoved = listUser.map((data, i) => {
                if(data.id === idProductRemove){
                    return i
                }else{
                    return null
                }
            })

            return {dataList: newProductList.filter(product => product), positionProductRemoved: positionProductRemoved[0]}
        }

        function removeDescriptionList(position, listDescriptionProduct){
            const newDescriptionProduct = listDescriptionProduct.map((data, i) => {
                if(position !== i){
                    return data
                }else{
                    return null
                }
            })

            return newDescriptionProduct.filter(description => description)
        }
    }
}

export default manageProduct