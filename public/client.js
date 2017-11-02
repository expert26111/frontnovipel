
import React from "react";
import ReactDOM from "react-dom";
import Moment from 'moment';
import Dropzone from 'react-dropzone';
import request from 'superagent';

const CLOUDINARY_UPLOAD_PRESET = 'eikjsjpt';
const CLOUDINARY_UPLOAD_URL = 'https://api.cloudinary.com/v1_1/novipel/upload';


// class Layout extends React.Component{
//     render(){
//         return (
//             <h1> It does work!!!</h1>
//         );
//     }
// }


class StoryForm extends React.Component {
    constructor() {
        super();
        this.state = {
            characters: 0,
            uploadedFileCloudinaryUrl: '',
            uploadedFile: null
        };
    }

    componentDidMount() {
        console.log('I was triggered during componentDidMount')
    }

    render() {
      //  console.log("the render method ",this.state.uploadedFile);
        //console.log("the render method ",this.uploadedFileCloudinaryUrl);

        var imgStyle = {
            height: "200px",
            width: "200px",

        };

        var textareaStyle = {
            height: "90px",
            width: "400px",

        };

        return (

            <form className="comment-form" onSubmit={this._handleSubmit.bind(this)}>
                <label>New Story </label><br></br>
                <div className="comment-form-fields">
                    <input placeholder="Title:" ref={c => this._title = c} /><br></br><br></br>

                    <Dropzone
                        multiple={false}
                        accept="image/*"
                        onDrop={this._onImageDrop.bind(this)}
                         >
                        <p>Drop an image or click to select a file to upload.</p>
                    </Dropzone>
                    <br></br><br></br>

                    <div>
                        {this.state.uploadedFileCloudinaryUrl === '' ? null :
                            <div>
                                <p>{this.state.uploadedFile.name}</p>
                                <img style={imgStyle} src={this.state.uploadedFileCloudinaryUrl} />
                            </div>}
                    </div>

                    <br></br>
                    {/*Choose Picture: <input ref={c => this._image = c} id="fileupload" type="file" name="pic" /><br></br><br></br>*/}
                    {/*<input placeholder="Link:" ref={c => this._link = c} /><br></br><br></br>*/}
                    <br></br>
                    <textarea style={textareaStyle} placeholder="Description:" ref={c => this._description = c} onChange={this._getCharacterCount.bind(this)}></textarea>
                    Max characters: 255! <br></br>
                    <p>{this.state.characters} characters</p>
                    <textarea style={textareaStyle} placeholder="Link for the Story :" ref={c => this._link = c} ></textarea>
                </div>

                <div className="comment-form-actions">
                    <button type="submit">
                        Post story
                    </button>
                </div>
            </form>
        );
    }

    _getCharacterCount(e) {
        this.setState({
            characters: this._description.value.length
        });
    }

    _onImageDrop(files) {
        // this.setState({
        //     characters: this._description.value.length
        // });

        this.setState({
            uploadedFile: files[0]

        });
     //   console.log("the files are ",files);
      //  console.log("the files are ",files[0]);
        this._handleImageUpload(files[0]);
    }

    _handleImageUpload(file) {
  //  console.log(" ia m in _handleImageUpload method ");
        let upload = request.post(CLOUDINARY_UPLOAD_URL)
            .field('upload_preset', CLOUDINARY_UPLOAD_PRESET)
            .field('file', file);

        upload.end((err, response) => {
            if (err) {
                console.error(err);
            }

            if (response.body.secure_url !== '') {
                this.setState({
                    uploadedFileCloudinaryUrl: response.body.secure_url
                });
            }
        });
    }


//

    _handleSubmit(event) {
        event.preventDefault();

        if(this.state.uploadedFileCloudinaryUrl)
        {
            if (!this._title.value || !this._description.value || this._description.value.length > 255 || !this._link.value ) {
                alert('Please enter title, description, link source and obey description limitations.');
                return;
            }

        }else {
            alert('Please upload a picture and wait to see it.');
            return;
        }


        var ImgLink = this.state.uploadedFileCloudinaryUrl;
        this.props.addComment(this._title.value, this._description.value, this._link.value, ImgLink );

        this._title.value = '';
        this._description.value = '';
        this._link.value = '';
        ImgLink = '';


        this.setState({ characters: 0  ,
            uploadedFileCloudinaryUrl: '',
            uploadedFile: null
        });
    }
}




class StoryBox extends React.Component {

    constructor() {
        super(); // super needs to be called first
        this.state = {
            showStories: false,
            stories: []
        };
    }

    componentWillMount() {
        this._fetchComments();
    }

    render() {
        const storiesdb = this._getStories();

        let storyNodes;
        if(this.state.showStories)
        {
            storyNodes =  <div className="comment-list">
                {storiesdb}
            </div>
        }

     //   console.log("the stories are from db ",storiesdb);
        return(

            <div className="comment-box">
            <hr></hr>
                <StoryForm addComment={this._addComment.bind(this)} />
                {/*<CommentAvatarList avatars = {this._getAvatars()}/>*/}
                {/*{this._getPopularMessage(comments.length)}*/}
                {/*<h3 className="comment-count">{this._getCommentsTitle(comments.length)}</h3>*/}
                <hr></hr>
                {/*{storiesdb}*/}
                {storyNodes}

            </div>
        );
    }

    // _getAvatars() {
    //     return this.state.comments.map((comment) => comment.avatarUrl);
    // }

    // _getPopularMessage(commentCount) {
    //     const POPULAR_COUNT = 10;
    //     if (commentCount > POPULAR_COUNT) {
    //         return (
    //             <div>This post is getting really popular, don't miss out!</div>
    //         );
    //     }
    // }

    _getStories() {
        return this.state.stories.map((story) => {
            console.log("the image stafff ",story)
            return (<Story
                Id = {story.Id}
                title={story.title}
                description={story.description}
                date_entry= {story.date_entry}
                link = {story.Link}
                img = {story.ImgLink}
                // story = {story}
                key={story.Id}
                onDelete={this._deleteStory.bind(this, story)}/>);
        });
    }


    _deleteStory(story)
    {
       // console.log("THE STORY TO BE DELETED ", story);
        $.ajax({
            method: 'DELETE',
            // data: story,
            url: `http://46.101.251.32:4000/stories/${story.Id}`,
            success: (message) => {
                //  console.log("the stories are ",stories);
                // this.setState({ stories });
                // console.log("the story to got concatanated is ",story);
                // this.setState({
                //     stories: this.state.stories.concat([storytoConcat])
                // });
                const storiesDeleted = [...this.state.stories]
                const removedIndex = storiesDeleted.indexOf(story);
                //console.log("THE INDEX TO BE REMOVED ",removedIndex)
                if(removedIndex > -1 )
                {
                    storiesDeleted.splice(removedIndex,1)
                    this.setState({stories: storiesDeleted})
                }
               // console.log("THE STORY TO BE DELETED ", story);
                console.log(message);
            }
        });
    }



    // _getCommentsTitle(commentCount) {
    //     if (commentCount === 0) {
    //         return 'No comments yet';
    //     } else if (commentCount === 1) {
    //         return '1 comment';
    //     } else {
    //         return `${commentCount} comments`;
    //     }
    // }

    _addComment(title, description, link , imglink) {
        let story = {
            title: title,
            description: description,
            link: link,
            img: imglink

            // avatarUrl: 'images/default-avatar.png'
        };

        let storytoConcat  = {
            title: title,
            description: description,
            date_entry: new Date(),
            Link: link,
            ImgLink: imglink
        }


        // this.setState({
        //     stories: this.state.stories.concat([story])
        // });


        $.ajax({
            method: 'POST',
            data: story,
            url: 'http://46.101.251.32:4000/stories/',
            success: (stories) => {
              //  console.log("the stories are ",stories);
                // this.setState({ stories });
                console.log("the story to got concatanated is ",story);
                this.setState({
                    stories: this.state.stories.concat([storytoConcat])
                });
            }
        });

    }

    _fetchComments() {
        $.ajax({
            method: 'GET',
            url: 'http://46.101.251.32:4000/stories/',
            success: (stories) => {
               // console.log("the stories are ",stories);

                 this.setState({ stories, showStories : true });
            }
        });
    }

    _deleteComment(commentID) {
        const comments = this.state.comments.filter(
            comment => comment.id !== commentID
        );

        this.setState({ comments });
    }
}


class Story extends React.Component {
    constructor() {
        super();
        // this.state = {
        //     isAbusive: false
        // };
    }

    render() {
      //  let commentBody;

        // if (!this.state.isAbusive) {
        //     commentBody = this.props.body;
        // } else {
        //     commentBody = <em>Content marked as abusive</em>;
        // }
       // commentBody = this.props.body;

        var imgStyle = {
            height: "200px",
            width: "200px",

        };

        let tim4e =  new Date(this.props.date_entry);
        Moment.locale('en');
        //let thekey =  this.props.key;
         // console.log("the key is ",thekey);
        console.log("THE IMAGE IS  ",this.props.Imglink);
        return(


            <div className="comment">

                {/*<img src={this.props.avatarUrl} alt={`${this.props.author}'s picture`} />*/}
                <p className="comment-header">Title : {this.props.title}</p>
                <p className="comment-header">Description : {this.props.description}</p>
                <p className="comment-header">Date : {Moment(tim4e).format('dd MMM YYYY')}</p>
                <p className="comment-header">Link : {this.props.link}</p>
                {/*<p className="comment-header">The Key:{this.props.key}</p>*/}
                <p className="comment-header">The Id:{this.props.Id}</p>
                The Picture:  <img style={imgStyle} src={this.props.img} />
                The story is: {this.props.story}
                {/*The text is : {this.props.imgLink}*/}
                {/*<p className="comment-body">*/}
                    {/*{commentBody}*/}
                {/*</p>*/}

                <div className="comment-actions">
                    <a onClick={this._handleDelete.bind(this)} href="#">Delete Story</a>
                    {/*<a href="#" onClick={this._toggleAbuse.bind(this)}>Report as Abuse</a>*/}
                </div>
                <hr></hr>
            </div>
        );
    }


    _toggleAbuse(event) {
        event.preventDefault();

        this.setState({
            isAbusive: !this.state.isAbusive
        });
    }S

    _handleDelete(event) {
        event.preventDefault();

        if (confirm('Are you sure?')) {
            this.props.onDelete(this.props.story);
        }
    }
}



const app = document.getElementById('content');

ReactDOM.render(<StoryBox/>, app);

