## Description

A React higher order component to download files from an external database.

## Installation

Step 1: Clone the repo 

```
git clone https://github.com/surferwat/react-hoc-downloaded-files.git
```

Step 2: Install the dependecies

```
cd <package_name>
npm install
```

Step 3: Go to app folder and install the module

```
npm install /file/path/to/module
```

## Usage

One way to store state for a file object that has been uploaded by a user is to use an external store (e.g., AWS S3). This higher order component takes a `downloadFiles` prop for your function to download files (i.e., `yourFileDownloadFunction` in the example below) from the external store and updates your state with a `files` object set with the downloaded files. It also takes an optional `callBack` prop if you want to pass the `files` object to a parent component.

InputForm.js
```javascript
import React, { useState } from 'react'
import Cookies from 'universal-cookie'
import { withDownloadedFiles } from 'react-hoc-downloaded-files'
import YourComponent from './path/to/your/component'
import yourFileDownloadFunction from './path/to/your/download/function'
import yourFileUploadFunction from './path/to/your/upload/function'


const YourComponetWithDownloadedFiles = withDownloadedFiles(YourComponent)


function InputForm() {
    const cookies = new Cookies()
    const [files, setFiles] = useState([])
    const [fileDetails, setFileDetails] = useState({} || cookies.get('fileDetails'))

    const toReviewForm = async () => {
        const details = await yourFileUploadFunction(files)
        cookies.set('fileDetails', details)
        // Go to ReviewForm
    }

    return (
        <YourComponentWithDownloadedFiles
            fileDetails={fileDetails}
            downloadFiles={yourFileDownloadFunction}
            callBack={setFiles}
            toReviewForm={toReviewForm}
        />
    )
}


export default InputForm
```

ReviewForm.js
```javascript
import React, { useState } from 'react'
import Cookies from 'universal-cookie'
import { withDownloadedFiles } from 'react-hoc-downloaded-files'
import YourComponent from './path/to/your/component'
import yourFileDownloadFunction from './path/to/your/download/function'


const YourComponetWithDownloadedFiles = withDownloadedFiles(YourComponent)


function ReviewForm() {
    const cookies = new Cook()
    const [files, setFiles] = useState([])
    const [fileDetails, setFileDetails] = useState(cookies.get('fileDetails'))

    const submitForm = () => {
        // You now have files! Do something with files
    }

    const backToInputForm = () => {
        // Go to InputForm
    }

    return (
        <YourComponentWithDownloadedFiles
            fileDetails={fileDetails}
            downloadFiles={yourFileDownloadFunction}
            callBack={setFiles}
            backToInputForm={backToInputForm}
        />
    )
}


export default ReviewForm
```

## References

* [React Typescript Cheatsheet Full HOC Example](https://react-typescript-cheatsheet.netlify.app/docs/hoc/full_example/)



