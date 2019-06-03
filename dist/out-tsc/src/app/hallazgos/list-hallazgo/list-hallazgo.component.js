import * as tslib_1 from "tslib";
import { Component, Input } from '@angular/core';
import { HallazgosService } from 'src/app/shared/hallazgos.service';
var ListHallazgoComponent = /** @class */ (function () {
    function ListHallazgoComponent(_hallazgo) {
        this._hallazgo = _hallazgo;
        this.getData(this.id_evento);
    }
    ListHallazgoComponent.prototype.ngOnInit = function () {
        this.getData(this.id_evento);
    };
    ListHallazgoComponent.prototype.getData = function (id) {
        var _this = this;
        this._hallazgo.getHallazgos(id).then(function (result) {
            _this.hallazgos = result;
            alert(JSON.stringify(_this.hallazgos));
        }, function (error) {
            console.log("ERROR: " + JSON.stringify(error));
        });
    };
    tslib_1.__decorate([
        Input(),
        tslib_1.__metadata("design:type", Number)
    ], ListHallazgoComponent.prototype, "id_evento", void 0);
    ListHallazgoComponent = tslib_1.__decorate([
        Component({
            selector: 'app-list-hallazgo',
            templateUrl: './list-hallazgo.component.html',
            styleUrls: ['./list-hallazgo.component.scss'],
        }),
        tslib_1.__metadata("design:paramtypes", [HallazgosService])
    ], ListHallazgoComponent);
    return ListHallazgoComponent;
}());
export { ListHallazgoComponent };
//# sourceMappingURL=list-hallazgo.component.js.map