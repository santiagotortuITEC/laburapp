
                    <Text htmlFor="apellido">Apellido </Text>
                    <TextInput id="apellido" onChange={this.handleChangeApellido} value={this.state.apellido} /> {"\n"}

 

                    <Text htmlFor="telefono">Telefono </Text>
                    <TextInput id="telefono" onChange={this.handleChangeTelefono} value={this.state.telefono} />  {"\n"}

                    <Text htmlFor="email">Email </Text>
                    <TextInput id="email" onChange={this.handleChangeEmail} value={this.state.email} />  {"\n"}

                    <Text htmlFor="email2">Reingresar Email  </Text>
                    <TextInput id="email2" onChange={this.handleChangeEmail2} value={this.state.email2} /> {"\n"}

                    <CheckBox title="Aceptar terminos" type="checkbox" id="terminos" onChange={this.handleChangeTermino} checked={this.state.terminos} />    {"\n"}
