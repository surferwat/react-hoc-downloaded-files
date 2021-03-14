import React from 'react'


type FileDetails = {
    fileName: string,
    fileType: string,
    fileUrl: string,
}

type DownloadFiles = {
    (fileDetails: FileDetails): Promise<Blob[]>
}

type CallBack = {
    (files: Blob[]): any
}

type ExternalProps = {
    fileDetails: FileDetails,
    downloadFiles: DownloadFiles
    callBack?: CallBack,
}

type InjectedProps = {
    files: Blob[]
}


function withDownloadedFiles<P extends InjectedProps, C>(
    WrappedComponent: React.JSXElementConstructor<P> & C,
) {
    type Props = JSX.LibraryManagedAttributes<C, Omit<P, 'data'>> & ExternalProps
    type State = {
        files: Blob[]
    }
    class WithDownloadedFilesComponent extends React.Component<Props, State> {
        constructor(props: Props) {
            super(props)
            this.state = {
                files: []
            }
        }

        async componentDidMount() {
            const downloaded = await this.props.downloadFiles(this.props.fileDetails)
            if (downloaded) this.setState({ files: downloaded })
            if (this.props.callBack) this.props.callBack(downloaded)
        }

        render() {
            return <WrappedComponent files={this.state.files} {...(this.props as any)} />
        }
    }

    return WithDownloadedFilesComponent
}


export { withDownloadedFiles }