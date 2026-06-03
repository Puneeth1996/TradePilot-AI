package com.tradepilot.tradejournal.web;

import com.tradepilot.tradejournal.entity.TradeEntry;
import com.tradepilot.tradejournal.service.TradeEntryService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.util.List;

@RestController
@RequestMapping("/api/trades")
public class TradeEntryController {

    private final TradeEntryService service;

    public TradeEntryController(TradeEntryService service) { this.service = service; }

    @GetMapping
    public List<TradeEntry> list() { return service.list(); }

    @GetMapping("/{id}")
    public ResponseEntity<TradeEntry> get(@PathVariable Long id) {
        TradeEntry e = service.get(id);
        return e == null ? ResponseEntity.notFound().build() : ResponseEntity.ok(e);
    }

    @PostMapping
    public ResponseEntity<TradeEntry> create(@RequestBody TradeEntry e) {
        TradeEntry saved = service.create(e);
        return ResponseEntity.created(URI.create("/api/trades/" + saved.getId())).body(saved);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        service.delete(id);
        return ResponseEntity.noContent().build();
    }
}
