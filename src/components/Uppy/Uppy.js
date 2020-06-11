import React, { Component } from "react";

const Uppy = require("uppy/lib/core");
const AwsS3 = require("uppy/lib/plugins/AwsS3");
const GoogleDrive = require("uppy/lib/plugins/GoogleDrive");
const Dropbox = require("uppy/lib/plugins/Dropbox");
const { Dashboard } = require("uppy/lib/react");

class UppyComp extends Component {
    componentWillMount() {
        this.host = "localhost:5000";
        this.uppy = new Uppy({
            autoProceed: false,
            restrictions: {
                maxFileSize: 10000000, //uppy options
                maxNumberOfFiles: 30,
                minNumberOfFiles: 1,
                allowedFileTypes: false
            }
        })
            .use(AwsS3, {
                host: this.host
            })
            .use(GoogleDrive, {
                host: this.host
            })
            .use(Dropbox, { host: this.host }).run();


    }



    render() {
        return (
            <div>
                <Dashboard //uppy dashboard component
                    uppy={this.uppy}
                    plugins={[
                        "GoogleDrive",
                        "Dropbox"//you can add more plugins here
                    ]}
                />
            </div>
        );
    }
}

export default UppyComp;