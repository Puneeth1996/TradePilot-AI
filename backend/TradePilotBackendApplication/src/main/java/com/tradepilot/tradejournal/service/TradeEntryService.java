package com.tradepilot.tradejournal.service;

import com.tradepilot.tradejournal.entity.TradeEntry;
import com.tradepilot.tradejournal.repository.TradeEntryRepository;
import org.springframework.stereotype.Service;

import java.time.OffsetDateTime;
import java.util.List;

@Service
public class TradeEntryService {

    private final TradeEntryRepository repo;

    public TradeEntryService(TradeEntryRepository repo) { this.repo = repo; }

    public TradeEntry create(TradeEntry e) {
        if (e.getExecutedAt() == null) e.setExecutedAt(OffsetDateTime.now());
        return repo.save(e);
    }

    public List<TradeEntry> list() { return repo.findAll(); }

    public TradeEntry get(Long id) { return repo.findById(id).orElse(null); }

    public void delete(Long id) { repo.deleteById(id); }
}
