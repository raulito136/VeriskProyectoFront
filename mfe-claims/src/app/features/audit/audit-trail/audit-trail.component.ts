import { Component, Input, OnChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClaimAudit } from '../../../models/claim-audit.model';
// 1. Importa la UI
import { TimelineComponent, TimelineEvent } from '@policy-system/ui';

@Component({
  selector: 'app-audit-trail',
  imports: [CommonModule, TimelineComponent],
  template: `
    <lib-timeline [events]="timelineEvents"></lib-timeline>
  `
})
export class AuditTrailComponent implements OnChanges {
  @Input() audits: ClaimAudit[] = [];
  
  // Array que espera tu librería
  timelineEvents: TimelineEvent[] = [];

  // Cuando las audits se pasen desde el padre, las transformamos al formato TimelineEvent
  ngOnChanges() {
    this.timelineEvents = this.audits.map(audit => ({
      title: `Change in ${audit.fieldChanged}`,
      timestamp: audit.changedAt,
      description: `${audit.changedBy} changed the value from '${audit.oldValue}' to '${audit.newValue}'.`,
      status: 'info'
    }));
  }
}