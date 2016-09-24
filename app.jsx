function NavBar(){

	return(

		<div>
			<nav className="navbar navbar-default ">
			<div className="container-fluid">
			<div className="navbar-header">
			  <button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1" aria-expanded="false">
			    <span className="sr-only">Toggle navigation</span>
			    <span className="icon-bar"></span>
			    <span className="icon-bar"></span>
			    <span className="icon-bar"></span>
			  </button>
			  <a className="navbar-brand" href="index.html">Classified App</a>
			</div>
			<div className="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
			  <ul className="nav navbar-nav navbar-right">
			  	<li><a href="#" data-toggle="modal" data-target="#userLogin">[ Login ]</a></li>
			    <li><a href="#" data-toggle="modal" data-target="#addPostModal">[ Post Add ]</a></li>
			  </ul>
			</div>
			</div>
			</nav>
		</div>		

	);
}

var ValidationAdmin = React.createClass({



	AdminValidate: function(){

		var adminName = document.forms["login_form"]["user_name"].value;
		var adminPass = document.forms["login_form"]["user_pass"].value;
		
			if(adminName != "" && adminPass != ""){

				alert('Welcome ' + adminName);
			
			} else {

				alert('Please Enter Valid Email Ur Password');

			}

	},

	render: function(){

		return(

			<div className="modal-footer">
			    <button type="button" className="btn btn-primary btn-md"  data-dismiss="modal" onClick={this.AdminValidate}>Post Add</button>
			</div>

		);
	} 

});

function AdminLogin(){

	return(

			<form id="admin-ad" name="login_form" method="POST">
			  <div className="modal fade" id="userLogin" role="dialog">
			    <div className="modal-dialog" role="document">
			      <div className="modal-content">
			        <div className="modal-header">
			          <button type="button" className="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
			          <h3 className="modal-title" id="exampleModalLabel">Post Your Add</h3>
			        </div>
			        <div className="modal-body">
			            
			            <div className="form-group">
					    <label>Username</label>
					    <input type="text" className="form-control" id="exampleInputEmail1" placeholder="User Name" name="user_name"/>
					  </div>
					  <div className="form-group">
					    <label>Password</label>
					    <input type="password" className="form-control" id="exampleInputPassword1" placeholder="Password" name="user_pass"/>
					  </div>

			        </div>
			        <ValidationAdmin />
			      </div>
			    </div>
			  </div>
			</form>  

	);

}

class ImageUpload extends React.Component {
  constructor(props) {
    super(props);
    this.state = {file: '',imagePreviewUrl: ''};
  }

  _handleImageChange(e) {
    e.preventDefault();

    let reader = new FileReader();
    let file = e.target.files;

    if (file && file[0]) {
        reader.onloadend = (e) => {
            var img_file = e.target.result;
            document.getElementById('img-preview').src = img_file;

            localStorage.setItem('ad_img', img_file);
        }
    }

    reader.readAsDataURL(file[0])
  }

  render() {
    let {imagePreviewUrl} = this.state;
    let $imagePreview = null;
    
    return (
      <div className="previewComponent">
        <input type="file" onChange={(e)=>this._handleImageChange(e)} id="uploader" />
          <div className="in-margin">
          	<img id="img-preview" src="" />
          </div>
      </div>
    )
  }
}


var ApprovePost = React.createClass({

	AddPost: function(){

		var ProductName  = document.forms["postAdd"]["pro_name"].value;
		var ProductSpec  = document.forms["postAdd"]["pro_des"].value;
		var ProductPrice = document.forms["postAdd"]["pro_price"].value;
		var SellerName   = document.forms["postAdd"]["sel_name"].value;
		var SellerNumber = document.forms["postAdd"]["sel_no"].value;
		var img_src = localStorage.getItem('img_src');
		var Category = document.getElementById("select-category");
		var ProductCategory = Category.options[Category.selectedIndex].value;

		if(ProductName != "" && ProductSpec != "" && ProductPrice != "" && SellerName != "" && SellerNumber !="" && ProductCategory != ""){

			var Selection; 

			switch(ProductCategory){

				case "lap-cat" :
					Selection = document.getElementById("laptop");
				break;

				case "gra-cat" : 
					Selection = document.getElementById("card");
				break;
				
				case "har-cat" :
					Selection = document.getElementById("hard");
				break;

				case "mot-cat" : 
					Selection = document.getElementById("board");
				break;
				
				case "pow-cat" :
					Selection = document.getElementById("supply");
				break;		

				default:
					alert('Please Select Valid Category');
				break;	
			}

			var img = (localStorage.getItem('ad_img')) ? localStorage.getItem('ad_img') : 'bootstrap/img/sample.png' ;
			var html = '<div id="'+ProductPrice+'">' +

							'<div class="col-md-3">' +
								'<div class="thumbnail">' +
								'<img src="'+img+'" class="img-thumbnail" alt="Image Alternate"/>' +
								'<div class="caption">' +
									'<h3>'+ProductName+'</h3>' +
									'<p>' + ProductSpec + '</p>' +
									'<a href="#" class="btn btn-primary btn-sm" data-toggle="modal" data-target="#'+SellerNumber+'"><span class="glyphicon glyphicon-eye-open"></span> View Detail</a>' +		
								'</div>' +
								'</div>' +
							'</div>' +

							'<div class="modal fade" id="'+SellerNumber+'"  role="dialog">' +
							    '<div class="modal-dialog" role="document">' +
							      '<div class="modal-content">' +
							        '<div class="modal-header">' +
							          '<button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>' +
							          '<h3 class="modal-title" id="exampleModalLabel">Detail View</h3>' +
							        '</div>' +
							        '<div class="modal-body">' +          
										
							        	'<center>' +
							        		'<img src="'+img+'" class="img-responsive" alt="Image Alternate" id="lapi2" width="250"/>' +
								        '</center>' +			        	
								        	'<h4><b>Seller</b> :<i>'+SellerName+'</i></h4>' +	
								        	'<h4><b>Product Name : </b>'+ProductName+'</h4>' +
								        	'<h4><b>Phone No : </b>'+SellerNumber+'</h4>' +
								        	'<h4><b>Rs : </b>'+ProductPrice+'</h4>' +
								        	
								        	'<h4><b>..:: Spacification ::..</b></h4>' +
								        	'<p><b> • '+ ProductSpec + '</b></p>' +
							        '</div>' +
							      '</div>' +
							    '</div>' +
							'</div>';

            		document.getElementById('img-preview').src = '';
					localStorage.removeItem('ad_img');
					Selection.innerHTML = Selection.innerHTML + html;
					document.getElementById("post-ad").reset();		

		} else {

			alert("All Fields Are Required");
		}

	},

	render: function(){

		return(

			<div><button type="button" className="btn btn-primary btn-md"  data-dismiss="modal" onClick={this.AddPost}>Post Add</button></div>

		);
	}

}); 

function PostAdd(){

	return(

		<div>

			<form id="post-ad" name="postAdd" method="POST">
			  <div className="modal fade" id="addPostModal" role="dialog">
			    <div className="modal-dialog" role="document">
			      <div className="modal-content">
			        <div className="modal-header">
			          <button type="button" className="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
			          <h3 className="modal-title" id="exampleModalLabel">Post Your Add</h3>
			        </div>
			        <div className="modal-body">
			            <div className="form-group">
			              <label >Product Name</label>
			              <input type="text" placeholder="Product Name" className="form-control" name="pro_name" />
			            </div>
			            <div className="form-group">
			              <label >Product Specification</label>
			              <textarea className="form-control" placeholder="Product Specification here . . ." name="pro_des" ></textarea>
			            </div>

			                <div className="form-group">
			                	<label className="control-label">Price</label>
			                	<input size="2" type="number" placeholder="100$" className="form-control" name="pro_price" />           
			                </div>

			                <div className="form-group">
			                	<label className="control-label">Seller Name</label>
			                	<input size="2" type="text" placeholder="Seller Name" className="form-control" name="sel_name" />           
			                </div>

			                <div className="form-group">
			                	<label className="control-label">Seler No</label>
			                	<input size="2" type="number" placeholder="090078601" className="form-control" name="sel_no" />           
			                </div>
			              <div className="form-group"> 
					    	<label >Select Category</label>
							<select className="form-control" id="select-category">
							  <option value="lap-cat">Laptop</option>
							  <option value="gra-cat">Graphic Cards</option>
							  <option value="har-cat">Hard Drive</option>
							  <option value="mot-cat">Mother Board</option>
							  <option value="pow-cat">Power Supply</option>
							</select>
						</div>

			             <div className="form-group">
			              <label className="control-label">
			                Product Image
			              </label>

			              <div className="uploader">
			              	<ImageUpload />
			              </div>
			            </div>

			        </div>
			        <div className="modal-footer">
			          <ApprovePost />
			        </div>
			      </div>
			    </div>
			  </div> 
			</form>

		</div>

	);
}


var ProductCategory = React.createClass({

	adsByCat: function(type){
		var gpu = document.getElementById("card");
		var laptop = document.getElementById("laptop");
		var hard = document.getElementById("hard");
		var board = document.getElementById("board");
		var supply = document.getElementById("supply");

		var ads_place = document.getElementsByClassName('ads-place');
		// var doc = document.createElement('div');
		
		var adsLen = ads_place[0].children;
		for (var i = 0; i < adsLen.length; i++) {
			adsLen[i].style.display = "none";
		}

		switch (type) {
			case 'laptop':
				laptop.style.display = "";
			break;

			case 'gpu':
				gpu.style.display = "";
			break;

			case 'board':
				board.style.display = "";
			break;

			case 'hard':
				hard.style.display = "";
			break;

			case 'supply':
				supply.style.display = "";
			break;
		}
	},

	render: function(){

		return(

			<ul className="list-group">
				<li className="list-group-item heading"><h2>Categories</h2></li>
				<li className="list-group-item item"><a href="#"><span className="glyphicon glyphicon-triangle-right" onClick={(type)=>this.adsByCat('laptop')}>Laptop</span></a></li>
				<li className="list-group-item item"><a href="#"><span className="glyphicon glyphicon-triangle-right" onClick={(type)=>this.adsByCat('gpu')}>Graphic Card</span></a></li>
				<li className="list-group-item item"><a href="#"><span className="glyphicon glyphicon-triangle-right" onClick={(type)=>this.adsByCat('hard')}>Hard Drives</span></a></li>
				<li className="list-group-item item"><a href="#"><span className="glyphicon glyphicon-triangle-right" onClick={(type)=>this.adsByCat('board')}>Motherboards</span></a></li>
				<li className="list-group-item item"><a href="#"><span className="glyphicon glyphicon-triangle-right" onClick={(type)=>this.adsByCat('supply')}>Power Supply</span></a></li>
			</ul>

		);
	}

});


function CauroselControl(){

	return(

		<div>

			<header id="myCarousel" className="carousel slide">
	        <ol className="carousel-indicators">
	            <li data-target="#myCarousel" data-slide-to="0" className="active"></li>
	            <li data-target="#myCarousel" data-slide-to="1"></li>
	            <li data-target="#myCarousel" data-slide-to="2"></li>
	            <li data-target="#myCarousel" data-slide-to="3"></li>
	            <li data-target="#myCarousel" data-slide-to="4"></li>
	        </ol>

	        <div className="carousel-inner">
	            <div className="item active">
	                <div className="fill"><img src="bootstrap/img/c1.jpg" width='100%' height='290px' /></div>
	                <div className="carousel-caption">
	                <h3>Laptop</h3>
	          		<p>"The atmosphere in Chania has a touch of Florence and Venice."</p>
	                </div>
	            </div>
	            <div className="item">
	                <div className="fill"><img src="bootstrap/img/c2.jpg" width='100%' height='290px' /></div>
	                <div className="carousel-caption">
	                <h3>Graphic Card</h3>
	          		<p>"The atmosphere in Chania has a touch of Florence and Venice."</p>
	                </div>
	            </div>
	            <div className="item">
	                <div className="fill"><img src="bootstrap/img/c4.jpg" width='100%' height='290px' /></div>
	                <div className="carousel-caption">
	                <h3>Hard Drive</h3>
	          		<p>"The atmosphere in Chania has a touch of Florence and Venice."</p>
	                </div>
	            </div>
	            <div className="item">
	                <div className="fill"><img src="bootstrap/img/c3.jpg" width='100%' height='290px' /></div>
	                <div className="carousel-caption">
	                <h3>Mother Board</h3>
	          		<p>"The atmosphere in Chania has a touch of Florence and Venice."</p>
	                </div>
	            </div>
	            <div className="item">
	                <div className="fill"><img src="bootstrap/img/c5.jpg" width='100%' height='290px' /></div>
	                <div className="carousel-caption">
	                <h3>Power Supply</h3>
	          		<p>"The atmosphere in Chania has a touch of Florence and Venice."</p>
	                </div>
	            </div>

	        </div>

	        <a className="left carousel-control" href="#myCarousel" data-slide="prev">
	            <span className="icon-prev"></span>
	        </a>
	        <a className="right carousel-control" href="#myCarousel" data-slide="next">
	            <span className="icon-next"></span>
	        </a>

	    </header>

		</div>

	);
}

function ProductTitle(){

	return(

		<div>
			<h1>All Product</h1>
		</div>

	);
}

function LaptopOnly(){

	return(

		<div id="categoryOfLaptop">

			<div id="lap1">

				<div className="col-md-3">
				<div className="thumbnail">
				<img src="bootstrap/img/lap1.jpg" className="img-thumbnail" alt="Image Alternate" id="lapi2" />
				<div className="caption">
					<h3 id="chay">Lenovo V310</h3>
					<p id="lapd1">
						•	Product Detail Here
					</p>
					<a href="#" className="btn btn-primary btn-sm" data-toggle="modal" data-target="#lapview"><span className="glyphicon glyphicon-eye-open"></span> View Detail</a>
					
				</div>
			</div>
			</div>

			<div className="modal fade" id="lapview"  role="dialog">
			    <div className="modal-dialog" role="document">
			      <div className="modal-content">
			        <div className="modal-header">
			          <button type="button" className="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
			          <h3 className="modal-title" id="exampleModalLabel">Detail View</h3>
			        </div>
			        <div className="modal-body">          
						
			        	<center>
			        		<img src="bootstrap/img/lap1.jpg" className="img-responsive" alt="Image Alternate" id="lapi2" width="250"/>
				        </center>			        	
				        	<h4><b>Seller</b> : <i> Saad Ahmed</i></h4>	
				        	<h4><b>Product Name : </b> Lenovo V310</h4>
				        	<h4><b>Phone No : </b>090078601</h4>
				        	<h4><b>Rs : </b>41,000.00</h4>
				        	
				        	<h4><b>..:: Spacification ::..</b></h4>
				        	<p><b>
					        	•	Intel® Core™ i5-6200U Processor <br />
								•	4GB DDR4 SDRAM <br />
								•	500GB SATA Hard Drive <br />
								•	15.6” HD Display with hinge opening <br />
				        	</b></p>
			        </div>
			        </div>
			    </div>
			</div>


			<div id="lap2">

				</div>

			<div className="col-md-3">
				<div className="thumbnail">
					<img src="bootstrap/img/lap2.jpg" className="img-thumbnail" alt="Image Alternate" id="lapi2" />
					<div className="caption">
						<h3 id="lapn1">HP 15-AY083nia</h3> 
						<p id="lapd1">
							•	Product Detail Here
						</p>
						<a href="#" className="btn btn-primary btn-sm" data-toggle="modal" data-target="#lapview2"><span className="glyphicon glyphicon-eye-open"></span> View Detail</a>
					</div>
				</div>
			</div>

			<div className="modal fade" id="lapview2"  role="dialog">
			    <div className="modal-dialog" role="document">
			      <div className="modal-content">
			        <div className="modal-header">
			          <button type="button" className="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
			          <h3 className="modal-title" id="exampleModalLabel">Detail View</h3>
			        </div>
			        <div className="modal-body">          
						
			        	<center>
			        		<img src="bootstrap/img/lap2.jpg" className="img-responsive" alt="Image Alternate" id="lapi2" width="250"/>
				        </center>			        	
				        	<h4><b>Seller</b> : <i> Osama Awan</i></h4>	
				        	<h4><b>Product Name : </b> HP 15-AY083nia</h4>
				        	<h4><b>Phone No : </b>090078601</h4>
				        	<h4><b>Rs : </b>34,000.00</h4>
				        	
				        	<h4><b>..:: Spacification ::..</b></h4>
				        	<p><b>
					        	•	Intel® Core™ i3-5005U <br />
								•	4 GB DDR3L-1600 SDRAM <br />
								•	500 GB 5400 rpm SATA <br />
								•	Textured linear grooves pattern <br />
				        	</b></p>

			        </div>
			        </div>
			    </div>
			</div>

			</div>

			<div id="lap4">

				<div className="col-md-3">
				<div className="thumbnail">
					<img src="bootstrap/img/lap3.jpg" className="img-thumbnail" alt="Image Alternate" id="lapi2" />
					<div className="caption">
						<h3 id="lapn1">ASUS ROG GL752VW</h3>
						<p id="lapd1">
							•	Product Detail Here
						</p>
						<a href="#" className="btn btn-primary btn-sm" data-toggle="modal" data-target="#lapview3"><span className="glyphicon glyphicon-eye-open"></span> View Detail</a>
					</div>
				</div>
			</div>

			<div className="modal fade" id="lapview3"  role="dialog">
			    <div className="modal-dialog" role="document">
			      <div className="modal-content">
			        <div className="modal-header">
			          <button type="button" className="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
			          <h3 className="modal-title" id="exampleModalLabel">Detail View</h3>
			        </div>
			        <div className="modal-body">          
						
			        	<center>
			        		<img src="bootstrap/img/lap3.jpg" className="img-responsive" alt="Image Alternate" id="lapi2" width="250"/>
				        </center>			        	
				        	<h4><b>Seller</b> : <i> Bilal Khan</i></h4>	
				        	<h4><b>Product Name : </b> ASUS ROG GL752VW</h4>
				        	<h4><b>Phone No : </b>090078601</h4>
				        	<h4><b>Rs : </b>163,900.00</h4>
				        	
				        	<h4><b>..:: Spacification ::..</b></h4>
				        	<p><b>
					        	•	Intel® Core™ i7 6700HQ Processor <br />
								•	16GB DDR4 2133 MHz SDRAM <br />
								•	NVIDIA® GeForce® GTX 960M <br /> 
								•	1TB HDD 5400 RPM + 128GB SSD <br />
				        	</b></p>

			        </div>
			        </div>
			    </div>
			</div>

			</div>

			<div id="lap4">

				<div className="col-md-3">
				<div className="thumbnail">
					<img src="bootstrap/img/lap5.jpg" className="img-thumbnail" alt="Image Alternate" id="lapi2" />
					<div className="caption">

						<h3 id="lapn1">Asus X. X555LA</h3>
						<p id="lapd1">
							•	Product Detail Here
						</p>
						<a href="#" className="btn btn-primary btn-sm" data-toggle="modal" data-target="#lapview4"><span className="glyphicon glyphicon-eye-open"></span> View Detail</a>
					</div>
				</div>
			</div>

			<div className="modal fade" id="lapview4"  role="dialog">
			    <div className="modal-dialog" role="document">
			      <div className="modal-content">
			        <div className="modal-header">
			          <button type="button" className="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
			          <h3 className="modal-title" id="exampleModalLabel">Detail View</h3>
			        </div>
			        <div className="modal-body">          
						
			        	<center>
			        		<img src="bootstrap/img/lap5.jpg" className="img-responsive" alt="Image Alternate" id="lapi4" width="250"/>
				        </center>			        	
				        	<h4><b>Seller</b> : <i> Hamza Awan</i></h4>	
				        	<h4><b>Product Name : </b> Asus X. X555LA</h4>
				        	<h4><b>Phone No : </b>090078601</h4>
				        	<h4><b>Rs : </b>36,800.00</h4>
				        	
				        	<h4><b>..:: Spacification ::..</b></h4>
				        	<p><b>
					        	•	Intel® Core™ i3-5005U Processor <br />
								•	4DDR3L 1600 MHz SDRAM <br />
								•	500GB HDD 5400 RPM <br /> 
								•	15.6 16:9 HD (1366x768) Display <br />
				        	</b></p>

			        </div>
			        </div>
			    </div>
			</div>

			</div>

		</div>

	);

}

function GraphicCard(){

	return(

		<div id="categoryOfGraphicCard">

			<div id="card1">

				<div className="col-md-3">
				<div className="thumbnail">
					<img src="bootstrap/img/card1.jpg" className="img-thumbnail" alt="Image Alternate" id="lapi2" />
					<div className="caption">
						<h3>Gigabyte RX460</h3>
						<p>
							•	Product Detail Here
						</p>
						<a href="#" className="btn btn-primary btn-sm" data-toggle="modal" data-target="#cardview"><span className="glyphicon glyphicon-eye-open"></span> View Detail</a>
					</div>
				</div>
			</div>

			<div className="modal fade" id="cardview"  role="dialog">
			    <div className="modal-dialog" role="document">
			      <div className="modal-content">
			        <div className="modal-header">
			          <button type="button" className="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
			          <h3 className="modal-title" id="exampleModalLabel">Detail View</h3>
			        </div>
			        <div className="modal-body">          
						
			        	<center>
			        		<img src="bootstrap/img/card1.jpg" className="img-responsive" alt="Image Alternate" id="lapi2" width="250"/>
				        </center>			        	
				        	<h4><b>Seller</b> : <i> Junaid Khan</i></h4>	
				        	<h4><b>Product Name : </b>Gigabyte RX460</h4>
				        	<h4><b>Phone No : </b>090078601</h4>
				        	<h4><b>Rs : </b>15,500</h4>
				        	
				        	<h4><b>..:: Spacification ::..</b></h4>
				        	<p><b>
					        	•	Powered by Radeon RX460 <br />
								•	Integrated with 2GB GDDR5 128bit<br />
								•	WINDFORCE 2X with Blade Fan<br />
								•	Support Full UHD HEVC Encode<br />
				        	</b></p>
			        </div>
			        </div>
			    </div>
			</div>

			</div>

			<div id="card2">

				<div className="col-md-3">
				<div className="thumbnail">
					<img src="bootstrap/img/card2.jpg" className="img-thumbnail" alt="Image Alternate" id="lapi2" />
					<div className="caption">
						<h3 id="lapn1">GeForce GT 730</h3> 
						<p id="lapd1">
							•	Product Detail Here
						</p>
						<a href="#" className="btn btn-primary btn-sm" data-toggle="modal" data-target="#cardview2"><span className="glyphicon glyphicon-eye-open"></span> View Detail</a>
					</div>
				</div>
			</div>

			<div className="modal fade" id="cardview2"  role="dialog">
			    <div className="modal-dialog" role="document">
			      <div className="modal-content">
			        <div className="modal-header">
			          <button type="button" className="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
			          <h3 className="modal-title" id="exampleModalLabel">Detail View</h3>
			        </div>
			        <div className="modal-body">          
						
			        	<center>
			        		<img src="bootstrap/img/card2.jpg" className="img-responsive" alt="Image Alternate" id="lapi2" width="250"/>
				        </center>			        	
				        	<h4><b>Seller</b> : <i> Atif Khan</i></h4>	
				        	<h4><b>Product Name : </b>GeForce GT 730</h4>
				        	<h4><b>Phone No : </b>090078601</h4>
				        	<h4><b>Rs : </b>7,700.00</h4>
				        	
				        	<h4><b>..:: Spacification ::..</b></h4>
				        	<p><b>
					        	•	96 CUDA Cores <br />
								•	2GB 128-Bit DDR3 <br />
								•	PCI Express 2.0 <br />
								•	Textured linear grooves pattern <br />
				        	</b></p>

			        </div>
			        </div>
			    </div>
			</div>

			</div>

			<div id="card3">

				<div className="col-md-3">
				<div className="thumbnail">
					<img src="bootstrap/img/card3.jpg" className="img-thumbnail" alt="Image Alternate" id="lapi2" />
					<div className="caption">
						<h3 id="lapn1">GeForce® GTX 1060</h3>
						<p id="lapd1">
							•	Product Detail Here
						</p>
						<a href="#" className="btn btn-primary btn-sm" data-toggle="modal" data-target="#cardview3"><span className="glyphicon glyphicon-eye-open"></span> View Detail</a>
					</div>
				</div>
			</div>

			<div className="modal fade" id="cardview3"  role="dialog">
			    <div className="modal-dialog" role="document">
			      <div className="modal-content">
			        <div className="modal-header">
			          <button type="button" className="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
			          <h3 className="modal-title" id="exampleModalLabel">Detail View</h3>
			        </div>
			        <div className="modal-body">          
						
			        	<center>
			        		<img src="bootstrap/img/card3.jpg" className="img-responsive" alt="Image Alternate" id="lapi2" width="250"/>
				        </center>			        	
				        	<h4><b>Seller</b> : <i> Ahsan Ilahi</i></h4>	
				        	<h4><b>Product Name : </b> GeForce® GTX 1060</h4>
				        	<h4><b>Phone No : </b>090078601</h4>
				        	<h4><b>Rs : </b>40,500.00</h4>
				        	
				        	<h4><b>..:: Spacification ::..</b></h4>
				        	<p><b>
					        	•	Integrated with 6GB GDDR5 192bit <br />
								•	WINDFORCE 2X with Blade Fan <br />
								•	16.8M Customizable Color RGB <br />
								•	Boost: 1847 MHz/ Base: 1620 MHz <br /> 
				        	</b></p>

			        </div>
			        </div>
			    </div>
			</div>

			</div>

			<div id="card4">

				<div className="col-md-3">
				<div className="thumbnail">
					<img src="bootstrap/img/card4.jpg" className="img-thumbnail" alt="Image Alternate" id="lapi2" />
					<div className="caption">

						<h3 id="lapn1">ASUS Radeon R7</h3>
						<p id="lapd1">
							•	Product Detail Here
						</p>
						<a href="#" className="btn btn-primary btn-sm" data-toggle="modal" data-target="#cardview4"><span className="glyphicon glyphicon-eye-open"></span> View Detail</a>
					</div>
				</div>
			</div>

			<div className="modal fade" id="cardview4"  role="dialog">
			    <div className="modal-dialog" role="document">
			      <div className="modal-content">
			        <div className="modal-header">
			          <button type="button" className="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
			          <h3 className="modal-title" id="exampleModalLabel">Detail View</h3>
			        </div>
			        <div className="modal-body">          
						
			        	<center>
			        		<img src="bootstrap/img/card4.jpg" className="img-responsive" alt="Image Alternate" id="lapi4" width="250"/>
				        </center>			        	
				        	<h4><b>Seller</b> : <i> Muzammil</i></h4>	
				        	<h4><b>Product Name : </b>ASUS Radeon R7</h4>
				        	<h4><b>Phone No : </b>090078601</h4>
				        	<h4><b>Rs : </b>10,700.00</h4>
				        	
				        	<h4><b>..:: Spacification ::..</b></h4>
				        	<p><b>
					        	•	2GB 128-Bit GDDR5 <br />
								•	Core Clock 725 MHz <br />
								•	Boost Clock 925 MHz <br />
								•	1 x DVI-I 1 x HDMI 1 x DisplayPort <br />
				        	</b></p>

			        </div>
			        </div>
			    </div>
			</div>

			</div>

		</div>			

	);
}



ReactDOM.render(<NavBar />, document.getElementById('navbar'));
ReactDOM.render(<AdminLogin />, document.getElementById('admin'));
ReactDOM.render(<PostAdd />, document.getElementById('add'));
ReactDOM.render(<ProductCategory />, document.getElementById('category'));
ReactDOM.render(<CauroselControl />, document.getElementById('carousel'));
ReactDOM.render(<ProductTitle />, document.getElementById('title'));
ReactDOM.render(<LaptopOnly />, document.getElementById('laptop'));
ReactDOM.render(<GraphicCard />, document.getElementById('card'));
