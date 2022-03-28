class AdminItems extends Component {
    static contextType = AuthContext;
  
    constructor(props) {
      super();
      this.state = {
        modalShow: false,
        items: [],
        itemName: "",
        itemPrice: 0,
        itemQuantity: 0,
        itemImage: "",
        itemCategory: -1,
        itemPlatform: -1,
        categories: [],
        platforms: [],
        itemSaleValue: "0",
        itemOnSale: false,
        itemDescription: "",
        searchField: "",
        editItem: {
          id: -1,
          itemPrice: 0,
          itemName: "",
          itemQuantity: 0,
          itemCategory: -1,
          itemPlatform: -1,
          modalTitle: "Edit Item",
          itemSaleValue: "0",
          itemOnSale: false,
          itemDescription: ""
        }
      };
    }
  
    showModal() {
      this.setState({ modalShow: true });
    }
  
    showNewModal() {
      this.setState({
        modalShow: true,
        editItem: {
          id: -1,
          itemPrice: 0,
          itemName: "",
          itemQuantity: 0,
          itemCategory: -1,
          itemPlatform: -1,
          itemOnSale: false,
          itemSaleValue: 0,
          itemDescription: "",
          modalTitle: "Add New Item",
        },
      });
    }
  
    componentDidMount() {
      this.getAllItems();
    }
  
    getAllItems = () => {
      const { accessToken } = this.context;
  
      axios
        .get(UrlLocator.getApiUrl("GET_ADMIN_ITEMS"), {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        })
        .then((response) => {
          this.setState({items: response.data.items, 
            platforms: response.data.platforms,
            categories: response.data.categories,
            itemPlatform: response.data.platforms[0].id,
            itemCategory: response.data.categories[0].id,
            modalShow: false})
      });
    };
  
    handleDelete = (id) => {
      const { accessToken } = this.context;
      axios
        .put(`${UrlLocator.getApiUrl("DELETE_ADMIN_ITEM")}/${id}`,{}, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        })
        .then((response) => {
          if (response.status === 200) this.getAllItems();
        });
    };
  
    activateRecord = (id) => {
      const { accessToken } = this.context;
      axios
        .put(`${UrlLocator.getApiUrl("ACTIVATE_ADMIN_ITEM")}/${id}`,{}, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        })
        .then((response) => {
          if (response.status === 200) this.getAllItems();
        });
    };
  
    updateGameLicences = (id) => {
  
    }
  
    handleChange = (event) => {
      if (event.target.name === "itemName") {
        this.setState({ itemName: event.target.value });
      } else if (event.target.name === "itemPrice") {
        this.setState({ itemPrice: event.target.value });
      } else if (event.target.name === "itemQuantity") {
        this.setState({ itemQuantity: event.target.value });
      } else if (event.target.name === "itemImage") {
        this.setState({ itemImage: event.target.files[0] });
      } else if (event.target.name === "itemCategory") {
        this.setState({ itemCategory: event.target.value });
      } else if (event.target.name === "itemOnSale") {
        this.setState({ itemOnSale: event.target.checked });
      } else if (event.target.name === "itemSaleValue") {
        this.setState({ itemSaleValue: event.target.value });
      } else if (event.target.name === "itemDescription") {
        this.setState({ itemDescription: event.target.value });
      } else if (event.target.name === "itemPlatform") {
        this.setState({ itemPlatform: event.target.value });
      } 
    };
  
    handleSearchFieldChange = (event) => {
      const { accessToken } = this.context;
      if (event.target.name === "searchField") {
        axios
        .get(UrlLocator.getApiUrl("GET_ADMIN_ITEMS"), {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        })
        .then((response) => {
            this.setState({items: response.data.items.filter((item) => item.itemName.toLowerCase().includes(event.target.value.toLowerCase())), 
              platforms: response.data.platforms,
              categories: response.data.categories,
              modalShow: false,
              searchField: event.target.value})
        });
  
      }
    }
  
    sortItemsByPice = () => {
      const { accessToken } = this.context;
      if(this.state.searchField === ""){
        if(this.state.sortDirection === "" || this.state.sortDirection === "DOWN"){
          axios
          .get(UrlLocator.getApiUrl("GET_ADMIN_ITEMS"), {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }).then((response) => {
            this.setState({items: response.data.items.sort((a, b) => { return (b.itemOnSale ? b.itemPrice : b.itemPrice) - (a.itemOnSale ? a.itemPrice : a.itemPrice); }), 
              platforms: response.data.platforms,
              categories: response.data.categories,
              modalShow: false,
              sortDirection: "UP"})
          });
        }else {
          axios
          .get(UrlLocator.getApiUrl("GET_ADMIN_ITEMS"), {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }).then((response) => {
          this.setState({items: response.data.items.sort((a, b) => { return (a.itemOnSale ? a.itemPrice : a.itemPrice) - (b.itemOnSale ? b.itemPrice : b.itemPrice); }), 
            platforms: response.data.platforms,
            categories: response.data.categories,
            modalShow: false,
            sortDirection: "DOWN"})
        });
        }
      } else {
        if(this.state.sortDirection === "" || this.state.sortDirection === "DOWN"){
          axios
          .get(UrlLocator.getApiUrl("GET_ADMIN_ITEMS"), {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }).then((response) => {
            this.setState({items: response.data.items.filter((item) => (item.itemName.toLowerCase().includes(this.state.searchField.toLowerCase()))).sort((a, b) => { return (b.itemOnSale ? b.itemPrice : b.itemPrice) - (a.itemOnSale ? a.itemPrice : a.itemPrice); }), 
              platforms: response.data.platforms,
              categories: response.data.categories,
              modalShow: false,
              sortDirection: "UP"})
          });
        }else {
          axios
          .get(UrlLocator.getApiUrl("GET_ADMIN_ITEMS"), {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }).then((response) => {
          this.setState({items: response.data.items.filter((item) => (item.itemName.toLowerCase().includes(this.state.searchField.toLowerCase()))).sort((a, b) => { return (a.itemOnSale ? a.itemPrice : a.itemPrice) - (b.itemOnSale ? b.itemPrice : b.itemPrice); }), 
            platforms: response.data.platforms,
            categories: response.data.categories,
            modalShow: false,
            sortDirection: "DOWN"})
        });
        }
      }
    }
  
    handleSave = () => {
      const { accessToken } = this.context;
      const formData = new FormData();
      formData.append("itemImage", this.state.itemImage);
      formData.append("itemName", this.state.itemName);
      formData.append("itemPrice", this.state.itemPrice);
      formData.append("itemQuantity", this.state.itemQuantity);
      formData.append("itemCategory", this.state.itemCategory);
      formData.append("itemOnSale", this.state.itemOnSale);
      formData.append("itemSaleValue", this.state.itemSaleValue);
      formData.append("itemDescription", this.state.itemDescription);
      formData.append("itemPlatform", this.state.itemPlatform);
  
      axios
        .post(UrlLocator.getApiUrl("SAVE_ADMIN_ITEM"), formData, {
          headers: {
            "Content-Type": "multipart/from-data",
            Authorization: `Bearer ${accessToken}`,
          },
        })
        .then(() => {
          this.getAllItems();
        })
        .catch((err) => {
          console.log(err);
        });
    };
  
    handleEdit = (id) => {
      const { accessToken } = this.context;
      axios
        .get(`${UrlLocator.getApiUrl("GET_ITEM_BY_ID")}/${id}`, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        })
        .then((response) => {
          if (response.status === 200 && response.data !== null) {
            const item = {
              id: response.data.id,
              itemPrice: response.data.itemPrice,
              itemName: response.data.itemName,
              itemQuantity: response.data.itemQuantity,
              itemCategory: response.data.itemCategory,
              itemPlatform: response.data.itemPlatform,
              itemSaleValue: response.data.itemSaleValue,
              itemOnSale: response.data.itemOnSale,
              itemDescription: response.data.itemDescription,
              modalTitle: "Edit Item"
            };
            this.setState({ modalShow: true, editItem: item });
          }
        });
    };
  
  
    showCategory = (itemCategory) => {
      return this.state.categories.filter((item) => itemCategory === item.id )[0].categoryName;
    }
  
    showPlatform = (itemPlatform) => {
      return this.state.platforms.filter((item) => itemPlatform === item.id )[0].platformName;
    }
  
    render() {
      return (
        <div className="container">
          <Row className="mt-3">
            <Col lg={{ span: 8, offset: 0 }} className="mt-3">
              <InputGroup>
                <FormControl
                  placeholder="Search for item..."
                  aria-label="searchField"
                  id="searchField"
                  name="searchField"
                  aria-describedby="basic-addon1"
                  onChange={this.handleSearchFieldChange}
                />
              </InputGroup>
            </Col>
            <Col className="d-flex align-items-center mt-3">
              <Button
                        variant="dark"
                        className="mx-3"
                        size="md"
                        onClick={this.sortItemsByPice}
                      >
                        Price {this.state.sortDirection === 'DOWN' || this.state.sortDirection === '' ? <BiSortUp size="1.5rem"/> : <BiSortDown size="1.5rem"/>}
                      </Button>
            </Col>
            <Col className="d-flex justify-content-end mt-3">
              <Button variant="outline-dark" onClick={() => this.showNewModal()}>
                Add New Item
              </Button>
            </Col>
          </Row>
  
          <Modal
            show={this.state.modalShow}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
          >
            <Modal.Header>
              <Modal.Title id="contained-modal-title-vcenter">
                {this.state.editItem.modalTitle}
              </Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Form.Group className="mb-3">
                <Form.Control
                  type="hidden"
                  placeholder="ID"
                  name="id"
                  defaultValue={this.state.editItem.id}
                />
              </Form.Group>
              <Row>
                <Col>
                  <Form.Label htmlFor="itemName">Name</Form.Label>
                  <Form.Control
                    type="text"
                    id="itemName"
                    name="itemName"
                    onChange={this.handleChange}
                    defaultValue={this.state.editItem.itemName}
                  />
                </Col>
                <Col>
                  <Form.Label htmlFor="itemPrice">Price</Form.Label>
                  <Form.Control
                    type="text"
                    id="itemPrice"
                    name="itemPrice"
                    onChange={this.handleChange}
                    defaultValue={this.state.editItem.itemPrice}
                  />
                </Col>
              </Row>
  
              <Row className="mt-2">
                <Col>
                  <Form.Label htmlFor="itemQuantity">Quantity</Form.Label>
                  <Form.Control
                    type="text"
                    id="itemQuantity"
                    name="itemQuantity"
                    onChange={this.handleChange}
                    defaultValue={this.state.editItem.itemQuantity}
                  />
                </Col>
                <Col>
                  <Form.Label htmlFor="itemImage">Upload Image</Form.Label>
                  <Form.Control
                    type="file"
                    className="custom-file-label"
                    id="itemImage"
                    name="itemImage"
                    label="Image Uploader"
                    onChange={this.handleChange}
                  />
                </Col>
              </Row>
              <Row className="mt-2">
                <Col xs={6} md={6} sm={12}>
                  <Form.Label htmlFor="itemCategory">Category</Form.Label>
                  <Form.Select
                    id="itemCategory"
                    name="itemCategory"
                    onChange={this.handleChange}
                    defaultValue={this.state.editItem.itemCategory}
                  >
                    {this.state.categories.map((item) => {
                      return (
                        <option key={item.id} value={item.id}>
                          {item.categoryName}
                        </option>
                      );
                    })}
                  </Form.Select>
                </Col>
                <Col xs={6} md={6} sm={12}>
                  <Form.Label htmlFor="itemPlatform">Platform</Form.Label>
  
                  <Form.Select
                    id="itemPlatform"
                    name="itemPlatform"
                    onChange={this.handleChange}
                    defaultValue={this.state.editItem.itemPlatform}
                  >
                    {this.state.platforms.map((item) => {
                      return (
                        <option key={item.id} value={item.id}>
                          {item.platformName}
                        </option>
                      );
                    })}
                  </Form.Select>
                </Col>
              </Row>
  
              <Row className="mt-4">
                <Col>
                  <Form.Check
                    type="switch"
                    id="itemOnSale"
                    name="itemOnSale"
                    label="Item on Sale"
                    onChange={this.handleChange}
                    defaultChecked={this.state.editItem.itemOnSale === true ? true : false}
                  />
                  <Form.Control
                    type="text"
                    id="itemSaleValue"
                    name="itemSaleValue"
                    onChange={this.handleChange}
                    defaultValue={this.state.editItem.itemSaleValue}
                    disabled={this.state.itemOnSale === true ? false : true}
                  />
                </Col>
  
                <Col></Col>
              </Row>
  
              <Row className="mt-2">
                <Col>
                  <Form.Label htmlFor="itemDescription">
                    Item Description
                  </Form.Label>
                  <Form.Control
                    id="itemDescription"
                    name="itemDescription"
                    as="textarea"
                    onChange={this.handleChange}
                    rows={3}
                    defaultValue={this.state.editItem.itemDescription}
                  />
                </Col>
              </Row>
            </Modal.Body>
            <Modal.Footer>
              <Button onClick={() => this.setState({ modalShow: false })}>
                Cancel
              </Button>
  
              <Button onClick={this.handleSave}>Save and Close</Button>
            </Modal.Footer>
          </Modal>
  
          <div className="d-flex flex-wrap justify-content-center my-4">
            {this.state.items.map((item) => {
              return (
                <Card
                  key={item.id}
                  style={{
                    width: "100%",
                    margin: "10px",
                  }}
                >
                  <Card.Header className="text-center">
                    {/*<Card.Header>{item.itemName}</Card.Header>*/}
                  {item.id ? (
                    <Card.Img
                      variant="top"
                      alt="Couldn't retrieve the file"
                      src={item.itemImage}
                      style={{ width: "17.9rem", height: "18rem" }}
                    />
                  ) : null}
                  </Card.Header>
  
                  <Card.Body>
                    <Card.Title>{item.itemName}</Card.Title>
                    <Card.Text> </Card.Text>
  
                    <Row className="my-2">
                      <Col xl={3} sm={3}><b>Price:</b></Col>
                      <Col xl={9} sm={9}>{item.itemOnSale ? <div><s>${item.itemPrice}</s><div className="mr-4">${(item.itemPrice - item.itemSaleValue * item.itemPrice / 100).toFixed(2)} <ImFire size="1.5em" color="red"/> <Badge>{item.itemSaleValue}% Sale</Badge></div></div> : <>${item.itemPrice}</>}</Col>
                    </Row>
                    <Row className="my-2">
                      <Col xl={3} sm={3}><b>Quanitiy:</b></Col>
                      <Col xl={9} sm={9}>{item.itemQuantity}</Col>
                    </Row>
                    <Row className="my-2">
                      <Col xl={3} sm={3}><b>Category:</b></Col>
                      <Col xl={9} sm={9}>{this.showCategory(item.itemCategory)}</Col>
                    </Row>
                    <Row className="my-2">
                      <Col xl={3} sm={3}><b>Platform:</b></Col>
                      <Col xl={9} sm={9}>{this.showPlatform(item.itemPlatform)}</Col>
                    </Row>
                    <Row className="my-2">
                      <Col xl={3} sm={3}><b>Status:</b></Col>
                      <Col xl={9} sm={9} style={{color: item.itemStatus === 'DELETED' ? 'red' : 'green'}}>{item.itemStatus === 'DELETED' ? 'Inactive' : 'Active'}</Col>
                    </Row>
                    <Row className="my-2">
                      <Col xl={3} sm={3}><b>Description:</b></Col>
                      <Col xl={9} sm={9}>{item.itemDescription}</Col>
                    </Row>
                  </Card.Body>
                  <Card.Footer>
                    <Button
                      variant="dark"
                      size="md"
                      onClick={() => this.handleEdit(item.id)}
                      disabled={item.itemStatus === 'DELETED' ? true : false}
                    >
                      Edit
                    </Button>
                    <Button
                      variant="dark"
                      size="md"
                      className="mx-1"
                      onClick={() => this.handleDelete(item.id)}
                      disabled={item.itemStatus === 'DELETED' ? true : false}
                    >
                      Delete
                    </Button>
                    {item.itemStatus === 'DELETED' ? (
                      <Button
                      variant="dark"
                      size="md"
                      className="mx-1"
                      onClick={() => this.activateRecord(item.id)}
                    >
                      Activate
                    </Button>
                    ) : null}
  
                    <Button
                      variant="dark"
                      size="md"
                      className="mx-1"
                      onClick={() => this.updateGameLicences(item.id)}
                    >
                      Update Licences
                    </Button>
                  </Card.Footer>
                </Card>
              );
            })}
          </div>
        </div>
      );
    }
  }
  
  export default AdminItems;
  