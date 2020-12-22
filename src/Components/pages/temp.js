import React from 'react'

export default function temp() {
    return (
        <div>
            <div className="maincontainer">
            <FullCalendar            
              plugins={[
                dayGridPlugin,
                interactionPlugin,
                listPlugin,
                timeGridPlugin,
              ]}
              initialView="timeGridWeek"
              headerToolbar={{
                left: "title",
                center: "dayGridDay,dayGridWeek,dayGridMonth,listWeek",
                right: "prev today next",
              }}
              dateClick={function (arg) {
                $("#myModal").modal("show");
              }}
              events={[]}
            />
          </div>
          <div class="modal" id="myModal">
            <div class="modal-dialog">
              <div class="modal-content">
                <div class="modal-header">
                  <h4 class="modal-title align-center">Add Event</h4>
                  <button type="button" class="close" data-dismiss="modal">
                    &times;
                  </button>
                </div>
                <form>
                  <div class="modal-body ">
                    <label className="label">Title</label>
                    <input
                      className="input"
                      type="text"
                      name="title"
                      onChange={this.onChange}
                    />
                    <label className="label">Start</label>
                    <DateTimePicker/>
                    
                    <label className="label">Description</label>
                    <textarea rows={5} cols={61} />
                    
                    
                  </div>
                  <div class="modal-footer">
                    <button className="button is-link" type="submit">
                      Add
                    </button>
                    <button
                      type="button"
                      class="btn btn-danger"
                      data-dismiss="modal"
                    >
                      Close
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
            
        </div>
    )
}
